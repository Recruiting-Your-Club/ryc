package com.ryc.api.v2.applicant.infra.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.applicant.infra.entity.ApplicantPersonalInfoEntity;

public class ApplicantMapper {
  public static Applicant toDomain(ApplicantEntity entity) {
    if (entity == null) return null;

    List<ApplicantPersonalInfo> personalInfos =
        entity.getPersonalInfos().stream().map(ApplicantPersonalInfoMapper::toDomain).toList();

    return Applicant.builder()
        .id(entity.getId())
        .name(entity.getName())
        .announcementId(entity.getAnnouncementId())
        .status(entity.getStatus())
        .isDeleted(entity.getIsDeleted())
        .email(entity.getEmail())
        .personalInfos(personalInfos)
        .build();
  }

  public static ApplicantEntity toEntity(Applicant domain) {
    if (domain == null) return null;

    List<ApplicantPersonalInfoEntity> personalInfos =
        domain.getPersonalInfos().stream()
            .map(ApplicantPersonalInfoMapper::toEntity)
            .collect(Collectors.toCollection(ArrayList::new));

    ApplicantEntity applicantEntity =
        ApplicantEntity.builder()
            .id(domain.getId())
            .announcementId(domain.getAnnouncementId())
            .status(domain.getStatus())
            .isDeleted(domain.getIsDeleted())
            .email(domain.getEmail())
            .name(domain.getName())
            .personalInfos(personalInfos)
            .build();

    for (ApplicantPersonalInfoEntity infoEntity : personalInfos) {
      infoEntity.setApplicant(applicantEntity);
    }

    return applicantEntity;
  }
}
