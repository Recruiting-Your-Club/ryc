package com.ryc.api.v2.application.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantPersonalInfoCreateRequest;
import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotency;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotencyRepository;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.email.domain.event.ApplicationSuccessEmailEvent;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationSubmissionTransactionService {

  private final AnnouncementRepository announcementRepository;
  private final ApplicationRepository applicationRepository;
  private final ApplicantRepository applicantRepository;
  private final ApplicationSubmissionIdempotencyRepository idempotencyRepository;
  private final FileService fileService;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public ApplicationSubmissionResponse submitApplication(
      ApplicationSubmissionRequest request,
      String announcementId,
      String idempotencyKey,
      String requestHash) {
    Optional<ApplicationSubmissionIdempotency> existing =
        idempotencyRepository.findByAnnouncementIdAndIdempotencyKey(announcementId, idempotencyKey);
    if (existing.isPresent()) {
      return resolveExisting(existing.get(), requestHash);
    }

    // 키를 먼저 저장해 동일 키에 대한 동시 요청 중 하나만 제출 흐름을 진행하도록 예약한다.
    ApplicationSubmissionIdempotency reservedIdempotency;
    try {
      reservedIdempotency =
          idempotencyRepository.save(
              ApplicationSubmissionIdempotency.initialize(
                  announcementId, idempotencyKey, requestHash));
    } catch (DataIntegrityViolationException e) {
      throw new IdempotencyKeyAlreadyExistsException("동일한 멱등키가 동시에 저장되었습니다.", e);
    }

    Announcement announcement = announcementRepository.findById(announcementId);

    if (announcement.getAnnouncementStatus() != AnnouncementStatus.RECRUITING) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.ANNOUNCEMENT_NOT_RECRUITING);
    }

    String applicantEmail = DataResolveUtil.sanitizeEmail(request.applicant().email());
    if (applicantRepository.existsByAnnouncementIdAndEmail(announcementId, applicantEmail)) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.DUPLICATE_APPLICATION);
    }

    Applicant applicant = Applicant.initialize(request.applicant(), announcementId);
    applicant.checkBusinessRules(announcement.getApplicationForm());

    Applicant savedApplicant;
    try {
      // 사전 exists 조회와 별개로, 동시 요청은 DB UNIQUE 제약조건으로 최종 보장한다.
      savedApplicant = applicantRepository.save(applicant);
    } catch (DataIntegrityViolationException e) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.DUPLICATE_APPLICATION);
    }

    String profileImage =
        request.applicant().personalInfos().stream()
            .filter(
                personalInfo ->
                    personalInfo.personalInfoQuestionType()
                        == PersonalInfoQuestionType.PROFILE_IMAGE)
            .findFirst()
            .map(ApplicantPersonalInfoCreateRequest::value)
            .orElse(null);

    Application application = Application.initialize(request.application(), applicant.getId());
    application.checkBusinessRules(announcement.getApplicationForm());

    Application savedApplication = applicationRepository.save(application, savedApplicant.getId());

    Map<String, String> fileIdsInAnswer =
        savedApplication.getAnswers().stream()
            .filter(answer -> answer.getFileMetadataId() != null)
            .collect(Collectors.toMap(Answer::getFileMetadataId, Answer::getId));

    if (profileImage != null) {
      fileService.claimOwnership(
          List.of(profileImage), savedApplicant.getId(), FileDomainType.APPLICANT_PROFILE);
    }

    fileIdsInAnswer.forEach(
        (fileId, answerId) ->
            fileService.claimOwnership(
                List.of(fileId), answerId, FileDomainType.ANSWER_ATTACHMENT));

    String clubName = announcementRepository.findClubNameByAnnouncementId(announcementId);

    idempotencyRepository.complete(
        reservedIdempotency.getId(), savedApplicant.getId(), savedApplication.getId());

    eventPublisher.publishEvent(
        ApplicationSuccessEmailEvent.builder()
            .announcementId(announcement.getId())
            .clubName(clubName)
            .announcementTitle(announcement.getTitle())
            .submittedDate(savedApplication.getCreatedAt())
            .applicantName(savedApplicant.getName())
            .applicantEmail(savedApplicant.getEmail())
            .build());

    return ApplicationSubmissionResponse.of(savedApplicant.getId(), savedApplication.getId());
  }

  private ApplicationSubmissionResponse resolveExisting(
      ApplicationSubmissionIdempotency idempotency, String requestHash) {
    if (!idempotency.getRequestHash().equals(requestHash)) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.IDEMPOTENCY_KEY_REUSED);
    }
    if (!idempotency.isCompleted()) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.IDEMPOTENCY_KEY_IN_PROGRESS);
    }
    return ApplicationSubmissionResponse.of(
        idempotency.getApplicantId(), idempotency.getApplicationId());
  }
}
