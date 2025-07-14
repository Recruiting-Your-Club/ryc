package com.ryc.api.v2.applicant.infra.mapper;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;

public class ApplicantMapper {
  private ApplicantMapper() {}

  public static ApplicantEntity toEntity(Applicant applicant) {
    return ApplicantEntity.builder()
        .id(applicant.getId())
        .name(applicant.getName())
        .email(applicant.getEmail())
        .announcementId(applicant.getAnnouncementId())
        .build();
  }

  public static Applicant toDomain(ApplicantEntity applicantEntity) {
    return Applicant.builder()
        .id(applicantEntity.getId())
        .name(applicantEntity.getName())
        .email(applicantEntity.getEmail())
        .announcementId(applicantEntity.getAnnouncementId())
        .build();
  }
}
