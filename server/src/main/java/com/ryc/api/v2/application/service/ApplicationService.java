package com.ryc.api.v2.application.service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationSubmissionRequest;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationGetResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSubmissionResponse;
import com.ryc.api.v2.application.presentation.dto.response.ApplicationSummaryResponse;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.ApplicationFormRepository;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {

  private final AnnouncementRepository announcementRepository;
  private final ApplicationRepository applicationRepository;
  private final ApplicantRepository applicantRepository;
  private final ApplicationFormRepository applicationFormRepository;

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

    // 4. 지원서 객체 생성 및 비즈니스 룰 검사
    Application application =
        Application.initialize(applicationSubmissionRequest.application(), applicant.getId());

    application.checkBusinessRules(announcement.getApplicationForm());

    Application savedApplication = applicationRepository.save(application, savedApplicant.getId());

    return ApplicationSubmissionResponse.of(savedApplicant.getId(), savedApplication.getId());
  }

  @Transactional(readOnly = true)
  public List<ApplicationSummaryResponse> getApplicationsByAnnouncementId(
      String announcementId, String status) {
    List<Applicant> applicants;

    // 1. status 변환
    ApplicantStatus applicantStatus = ApplicantStatus.from(status);

    // 2. status에 따른 공고 조회
    if (applicantStatus == null) {
      applicants = applicantRepository.findAllByAnnouncementId(announcementId);
    } else {
      applicants =
          applicantRepository.findAllByAnnouncementIdAndStatus(announcementId, applicantStatus);
    }
    // 3. 해당 공고의 모든 지원자 조회
    if (applicants.isEmpty()) {
      return List.of();
    }

    // 4. 모든 지원자의 지원서를 한번에 조회 (N+1 방지)
    List<String> applicantIds = applicants.stream().map(Applicant::getId).toList();
    Map<String, Application> applicationMap =
        applicationRepository.findAllByApplicantIdIn(applicantIds).stream()
            .collect(Collectors.toMap(Application::getApplicantId, Function.identity()));

    // 5. DTO로 조립
    return applicants.stream()
        .map(
            applicant -> {
              Application application = applicationMap.get(applicant.getId());
              // submittedAt은 application 객체에서 가져옴
              return ApplicationSummaryResponse.of(applicant, application.getCreatedAt());
            })
        .collect(Collectors.toList());
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

    // 4. DTO로 조립
    return ApplicationGetResponse.of(applicant, application, applicationForm);
  }
}
