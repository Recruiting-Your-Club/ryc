package com.ryc.api.v2.application.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.application.infra.entity.ApplicationSubmissionIdempotencyEntity;

@Repository
public interface ApplicationSubmissionIdempotencyJpaRepository
    extends JpaRepository<ApplicationSubmissionIdempotencyEntity, String> {

  Optional<ApplicationSubmissionIdempotencyEntity> findByAnnouncementIdAndIdempotencyKey(
      String announcementId, String idempotencyKey);
}
