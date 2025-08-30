package com.ryc.api.v2.applicant.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.event.AnnouncementDeletedEvent;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.domain.event.ApplicantDeletedEvent;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantStatusRequest;
import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantGetResponse;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicantService {

  private final ApplicantRepository applicantRepository;
  private final ApplicationRepository applicationRepository;
  private final FileService fileService;
  private final ApplicationEventPublisher eventPublisher;

  @Transactional
  public void changeApplicantStatus(String applicantId, ApplicantStatusRequest statusRequest) {
    Applicant applicant = applicantRepository.findById(applicantId);
    ApplicantStatus newStatus = ApplicantStatus.from(statusRequest.status());

    if (applicant.getStatus() == newStatus) {
      throw new IllegalArgumentException(
          "Applicant status is already " + newStatus + ". No change needed.");
    }

    Applicant updatedApplicant = applicant.updateStatus(newStatus);
    applicantRepository.save(updatedApplicant);
  }

  @Transactional(readOnly = true)
  public List<ApplicantGetResponse> getApplicants(String announcementId, String status) {
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

    // 4. 모든 지원자의 createdAt 조회
    List<String> applicantIds = applicants.stream().map(Applicant::getId).toList();
    Map<String, LocalDateTime> createdAts =
        applicationRepository.findCreatedAtByApplicantIds(applicantIds);

    // 5. 프로필 이미지 파일 수집 및 프라이빗 URL 매핑
    List<String> profileFileIds =
        applicants.stream()
            .flatMap(applicant -> applicant.getPersonalInfos().stream())
            .filter(
                personalInfo ->
                    personalInfo.getQuestionType() == PersonalInfoQuestionType.PROFILE_IMAGE)
            .map(ApplicantPersonalInfo::getValue)
            .filter(id -> id != null && !id.isBlank())
            .distinct()
            .toList();

    Map<String, FileGetResponse> fileMap =
        profileFileIds.isEmpty()
            ? Map.of()
            : fileService.getPrivateFileResponsesForFileIds(profileFileIds);

    // 6. DTO로 조립 (프로필 이미지 포함)
    return applicants.stream()
        .map(
            applicant -> {
              LocalDateTime submittedAt = createdAts.get(applicant.getId());

              String profileFileId =
                  applicant.getPersonalInfos().stream()
                      .filter(
                          personalInfo ->
                              personalInfo.getQuestionType()
                                  == PersonalInfoQuestionType.PROFILE_IMAGE)
                      .map(ApplicantPersonalInfo::getValue)
                      .filter(value -> value != null && !value.isBlank())
                      .findFirst()
                      .orElse(null);
              FileGetResponse profileImage =
                  profileFileId == null ? null : fileMap.get(profileFileId);

              return ApplicantGetResponse.builder()
                  .imagePresent(profileImage != null)
                  .applicantId(applicant.getId())
                  .name(applicant.getName())
                  .email(applicant.getEmail())
                  .status(applicant.getStatus())
                  .submittedAt(submittedAt)
                  .representativeImage(profileImage)
                  .build();
            })
        .toList();
  }

  @Transactional
  public void deleteApplicants(List<String> applicantIds) {
    if (applicantIds.isEmpty()) {
      return;
    }

    eventPublisher.publishEvent(new ApplicantDeletedEvent(applicantIds));
    applicantRepository.deleteAllByIdIn(applicantIds);
    applicationRepository.deleteAllByApplicantIds(applicantIds);
  }

  @EventListener
  @Transactional(propagation = Propagation.MANDATORY)
  protected void handleAnnouncementDeletedEvent(AnnouncementDeletedEvent event) {
    event
        .announcementIds()
        .forEach(
            announcementId ->
                deleteApplicants(applicantRepository.findAllIdByAnnouncementId(announcementId)));
  }
}
