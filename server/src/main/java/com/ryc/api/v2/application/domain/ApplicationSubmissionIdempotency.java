package com.ryc.api.v2.application.domain;

import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApplicationSubmissionIdempotency {

  private final String id;
  private final String announcementId;
  private final String idempotencyKey;
  private final String requestHash;
  private final String applicantId;
  private final String applicationId;

  @Builder
  private ApplicationSubmissionIdempotency(
      String id,
      String announcementId,
      String idempotencyKey,
      String requestHash,
      String applicantId,
      String applicationId) {
    this.id = id;
    this.announcementId = announcementId;
    this.idempotencyKey = idempotencyKey;
    this.requestHash = requestHash;
    this.applicantId = applicantId;
    this.applicationId = applicationId;
  }

  public static ApplicationSubmissionIdempotency initialize(
      String announcementId, String idempotencyKey, String requestHash) {
    return ApplicationSubmissionIdempotency.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .announcementId(announcementId)
        .idempotencyKey(idempotencyKey)
        .requestHash(requestHash)
        .build();
  }

  public boolean isCompleted() {
    return applicantId != null && applicationId != null;
  }
}
