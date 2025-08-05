package com.ryc.api.v2.applicant.infra.mapper;

import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicant.infra.entity.ApplicantPersonalInfoEntity;

public class ApplicantPersonalInfoMapper {

  public static ApplicantPersonalInfo toDomain(ApplicantPersonalInfoEntity entity) {
    if (entity == null) return null;

    return ApplicantPersonalInfo.builder()
        .id(entity.getId())
        .questionType(entity.getQuestionType())
        .value(entity.getValue())
        .build();
  }

  public static ApplicantPersonalInfoEntity toEntity(ApplicantPersonalInfo domain) {
    if (domain == null) return null;

    return ApplicantPersonalInfoEntity.builder()
        .id(domain.getId())
        .questionType(domain.getQuestionType())
        .value(domain.getValue())
        .build();
  }
}
