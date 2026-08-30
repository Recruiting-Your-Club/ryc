package com.ryc.api.v2.application.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.infra.entity.BaseEntity;

import lombok.*;

@Entity
@Table(
    name = "application_submission_idempotencies",
    uniqueConstraints =
        @UniqueConstraint(
            name = "uk_application_submission_idempotency",
            columnNames = {"announcement_id", "idempotency_key"}))
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicationSubmissionIdempotencyEntity extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(name = "announcement_id", nullable = false)
  private String announcementId;

  @Column(name = "idempotency_key", nullable = false, length = 255)
  private String idempotencyKey;

  @Column(name = "request_hash", nullable = false, length = 64)
  private String requestHash;

  @Column(name = "applicant_id")
  private String applicantId;

  @Column(name = "application_id")
  private String applicationId;

  public void complete(String applicantId, String applicationId) {
    this.applicantId = applicantId;
    this.applicationId = applicationId;
  }
}
