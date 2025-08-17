package com.ryc.api.v2.application.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantPersonalInfoCreateRequest;
import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationGetResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.ApplicationFormRepository;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {

  private final AnnouncementRepository announcementRepository;
  private final ApplicationRepository applicationRepository;
  private final ApplicantRepository applicantRepository;
  private final ApplicationFormRepository applicationFormRepository;
  private final FileService fileService;

  @Transactional
  public ApplicationSubmissionResponse submitApplication(
      ApplicationSubmissionRequest applicationSubmissionRequest, String announcementId) {
    // 1. 공고 조회
    Announcement announcement = announcementRepository.findById(announcementId);

    // 2. 공고 모집중 확인
    if (announcement.getAnnouncementStatus() != AnnouncementStatus.RECRUITING) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.ANNOUNCEMENT_NOT_RECRUITING);
    }
    if (applicantRepository.existsByAnnouncementIdAndEmail(
        announcementId, applicationSubmissionRequest.applicant().email())) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.DUPLICATE_APPLICATION);
    }
    // 3. 지원자 객체 생성 및 비즈니스 룰 검사
    Applicant applicant =
        Applicant.initialize(applicationSubmissionRequest.applicant(), announcementId);

    applicant.checkBusinessRules(announcement.getApplicationForm());

    Applicant savedApplicant = applicantRepository.save(applicant);

    String profileImage =
        applicationSubmissionRequest.applicant().personalInfos().stream()
            .filter(
                personalInfo ->
                    personalInfo.personalInfoQuestionType()
                        == PersonalInfoQuestionType.PROFILE_IMAGE)
            .findFirst()
            .map(ApplicantPersonalInfoCreateRequest::value)
            .orElse(null);

    // 4. 지원서 객체 생성 및 비즈니스 룰 검사
    Application application =
        Application.initialize(applicationSubmissionRequest.application(), applicant.getId());

    application.checkBusinessRules(announcement.getApplicationForm());

    Application savedApplication = applicationRepository.save(application, savedApplicant.getId());

    Map<String, String> fileIdsInAnswer =
        savedApplication.getAnswers().stream()
            .filter(answer -> answer.getFileMetadataId() != null)
            .collect(Collectors.toMap(Answer::getFileMetadataId, Answer::getId));

    // 5. 파일 소유권
    // 5-1. 프로필 이미지 소유권
    if (profileImage != null) {
      fileService.claimOwnershipAsync(
          List.of(profileImage), savedApplicant.getId(), FileDomainType.APPLICATION_PROFILE);
    }

    // 5-2. 답변 파일 소유권 (answerId별)
    // TODO: 한번에 처리하도록 변경
    fileIdsInAnswer.forEach(
        (fileId, answerId) ->
            fileService.claimOwnershipAsync(
                List.of(fileId), answerId, FileDomainType.ANSWER_ATTACHMENT));

    return ApplicationSubmissionResponse.of(savedApplicant.getId(), savedApplication.getId());
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
