package com.ryc.api.v2.application.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotency;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotencyRepository;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationGetResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.ApplicationFormRepository;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.file.service.FileService;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {

  private static final int IDEMPOTENCY_KEY_MAX_LENGTH = 255;

  private final ApplicationSubmissionTransactionService applicationSubmissionTransactionService;
  private final ApplicationSubmissionIdempotencyRepository idempotencyRepository;
  private final ApplicationSubmissionRequestHasher requestHasher;
  private final ApplicationRepository applicationRepository;
  private final ApplicantRepository applicantRepository;
  private final ApplicationFormRepository applicationFormRepository;
  private final FileService fileService;

  public ApplicationSubmissionResponse submitApplication(
      ApplicationSubmissionRequest applicationSubmissionRequest, String announcementId) {
    return submitApplication(
        applicationSubmissionRequest, announcementId, UUID.randomUUID().toString());
  }

  public ApplicationSubmissionResponse submitApplication(
      ApplicationSubmissionRequest applicationSubmissionRequest,
      String announcementId,
      String idempotencyKey) {
    String normalizedIdempotencyKey = normalizeIdempotencyKey(idempotencyKey);
    String requestHash = requestHasher.hash(announcementId, applicationSubmissionRequest);

    Optional<ApplicationSubmissionIdempotency> existing =
        idempotencyRepository.findByAnnouncementIdAndIdempotencyKey(
            announcementId, normalizedIdempotencyKey);
    if (existing.isPresent()) {
      return resolveExisting(existing.get(), requestHash);
    }

    try {
      return applicationSubmissionTransactionService.submitApplication(
          applicationSubmissionRequest, announcementId, normalizedIdempotencyKey, requestHash);
    } catch (IdempotencyKeyAlreadyExistsException e) {
      // 다른 트랜잭션이 먼저 키를 예약했다면 해당 트랜잭션의 커밋 이후 저장된 결과를 반환
      Optional<ApplicationSubmissionIdempotency> reserved =
          idempotencyRepository.findByAnnouncementIdAndIdempotencyKey(
              announcementId, normalizedIdempotencyKey);
      if (reserved.isPresent()) {
        return resolveExisting(reserved.get(), requestHash);
      }

      // 먼저 예약한 요청이 검증 실패 등으로 롤백된 경우 현재 요청이 키를 재확보
      return applicationSubmissionTransactionService.submitApplication(
          applicationSubmissionRequest, announcementId, normalizedIdempotencyKey, requestHash);
    }
  }

  private String normalizeIdempotencyKey(String idempotencyKey) {
    String normalizedKey = DataResolveUtil.sanitizeString(idempotencyKey);
    if (normalizedKey == null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.IDEMPOTENCY_KEY_REQUIRED);
    }
    if (normalizedKey.length() > IDEMPOTENCY_KEY_MAX_LENGTH) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.IDEMPOTENCY_KEY_INVALID);
    }
    return normalizedKey;
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

  @Transactional(readOnly = true)
  public ApplicationGetResponse getApplicationDetail(String announcementId, String applicantId) {
    // 1. 지원자 조회
    Applicant applicant = applicantRepository.findById(applicantId);

    // 2. 지원서 조회
    Application application = applicationRepository.findByApplicantId(applicant.getId());

    // 3. 지원서 양식 조회
    ApplicationForm applicationForm =
        applicationFormRepository.findByAnnouncementId(announcementId);

    // 4. 파일 프라이빗 URL 매핑 준비: Answer들의 fileMetadataId + PROFILE_IMAGE 수집 후 URL 조회
    List<String> answerFileIds =
        application.getAnswers().stream()
            .map(Answer::getFileMetadataId)
            .filter(id -> id != null && !id.isBlank())
            .toList();

    // 프로필 사진 불러오기
    List<String> personalFileIds =
        applicant.getPersonalInfos().stream()
            .filter(pi -> pi.getQuestionType() == PersonalInfoQuestionType.PROFILE_IMAGE)
            .map(ApplicantPersonalInfo::getValue)
            .filter(id -> id != null && !id.isBlank())
            .toList();

    // 모든 fileMetadataId 불러오기
    List<String> fileMetadataIds =
        Stream.concat(answerFileIds.stream(), personalFileIds.stream()).distinct().toList();

    Map<String, FileGetResponse> fileMap =
        fileService.getPrivateFileResponsesForFileIds(fileMetadataIds);

    // 5. DTO로 조립 (파일 URL 포함)
    return ApplicationGetResponse.of(applicant, application, applicationForm, fileMap);
  }
}
