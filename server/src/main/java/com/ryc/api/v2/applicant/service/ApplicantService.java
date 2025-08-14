package com.ryc.api.v2.applicant.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantStatusRequest;
import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantGetResponse;
import com.ryc.api.v2.application.domain.ApplicationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicantService {

  private final ApplicantRepository applicantRepository;
  private final ApplicationRepository applicationRepository;
  private final AnnouncementRepository announcementRepository;

  @Transactional
  public void changeApplicantStatus(String applicantId, ApplicantStatusRequest statusRequest) {
    Applicant applicant = applicantRepository.findById(applicantId);
    ApplicantStatus newStatus = ApplicantStatus.from(statusRequest.status());

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

    // 5. 이미지 수집 허용 여부 및 지원자 이미지 조회
    final boolean imageAllowed = announcementRepository.imageAllowed(announcementId);
    final Map<String, String> imageUrlMap =
        applicantRepository.findApplicantImageUrlsByIds(applicantIds);

    // 6. DTO로 조립
    return applicants.stream()
        .map(applicant -> buildApplicantResponse(applicant, createdAts, imageAllowed, imageUrlMap))
        .toList();
  }

  /**
   * 지원자 정보를 응답 DTO로 변환
   *
   * @param applicant 지원자 도메인
   * @param createdAts 지원자별 지원서 제출 시간 매핑
   * @param imageAllowed 공고의 이미지 수집 허용 여부
   * @param imageUrlMap 지원자별 이미지 URL 매핑
   * @return 지원자 정보 응답 DTO
   */
  private ApplicantGetResponse buildApplicantResponse(
      Applicant applicant,
      Map<String, LocalDateTime> createdAts,
      boolean imageAllowed,
      Map<String, String> imageUrlMap) {

    final String applicantId = applicant.getId();
    final LocalDateTime submittedAt = createdAts.get(applicantId);
    final String imageUrl = imageUrlMap.getOrDefault(applicantId, "");

    return ApplicantGetResponse.builder()
        .applicantId(applicantId)
        .name(applicant.getName())
        .email(applicant.getEmail())
        .imageAllowed(imageAllowed)
        .imagePresent(!imageUrl.isEmpty())
        .imageUrl(imageUrl)
        .thumbnailUrl(imageUrl) // TODO: 별도 썸네일 로직 구현 필요
        .status(applicant.getStatus())
        .submittedAt(submittedAt)
        .build();
  }
}
