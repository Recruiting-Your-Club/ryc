package com.ryc.api.v2.applicant.infra.mapper;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;

public class ApplicantMapper {
    public static Applicant toDomain(ApplicantEntity entity) {
        if (entity == null) return null;
        return Applicant.builder()
                .id(entity.getId())
                .userId(entity.getId())
                .announcementId(entity.getAnnouncementId())
                .status(entity.getStatus())
                .isDeleted(entity.getIsDeleted())
                .email(entity.getEmail())
                .build();
    }

    public static ApplicantEntity toEntity(Applicant domain) {
        if (domain == null) return null;
        return ApplicantEntity.builder()
                .id(domain.getId())
                .announcementId(domain.getAnnouncementId())
                .status(domain.getStatus())
                .isDeleted(domain.getIsDeleted())
                .email(domain.getEmail())
                .name(domain.getName())
                .build();
    }
}
