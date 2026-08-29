package com.ryc.api.v2.application.domain;

import java.util.Optional;

public interface ApplicationSubmissionIdempotencyRepository {

  ApplicationSubmissionIdempotency save(ApplicationSubmissionIdempotency idempotency);

  void complete(String id, String applicantId, String applicationId);

  Optional<ApplicationSubmissionIdempotency> findByAnnouncementIdAndIdempotencyKey(
      String announcementId, String idempotencyKey);
}
