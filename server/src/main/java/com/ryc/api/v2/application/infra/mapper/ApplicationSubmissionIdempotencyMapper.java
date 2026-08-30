package com.ryc.api.v2.application.infra.mapper;

import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotency;
import com.ryc.api.v2.application.infra.entity.ApplicationSubmissionIdempotencyEntity;

public final class ApplicationSubmissionIdempotencyMapper {

  private ApplicationSubmissionIdempotencyMapper() {}

  public static ApplicationSubmissionIdempotency toDomain(
      ApplicationSubmissionIdempotencyEntity entity) {
    return ApplicationSubmissionIdempotency.builder()
        .id(entity.getId())
        .announcementId(entity.getAnnouncementId())
        .idempotencyKey(entity.getIdempotencyKey())
        .requestHash(entity.getRequestHash())
        .applicantId(entity.getApplicantId())
        .applicationId(entity.getApplicationId())
        .build();
  }

  public static ApplicationSubmissionIdempotencyEntity toEntity(
      ApplicationSubmissionIdempotency domain) {
    return ApplicationSubmissionIdempotencyEntity.builder()
        .id(domain.getId())
        .announcementId(domain.getAnnouncementId())
        .idempotencyKey(domain.getIdempotencyKey())
        .requestHash(domain.getRequestHash())
        .applicantId(domain.getApplicantId())
        .applicationId(domain.getApplicationId())
        .build();
  }
}
