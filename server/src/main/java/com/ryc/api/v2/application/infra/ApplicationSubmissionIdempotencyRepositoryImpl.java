package com.ryc.api.v2.application.infra;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotency;
import com.ryc.api.v2.application.domain.ApplicationSubmissionIdempotencyRepository;
import com.ryc.api.v2.application.infra.entity.ApplicationSubmissionIdempotencyEntity;
import com.ryc.api.v2.application.infra.jpa.ApplicationSubmissionIdempotencyJpaRepository;
import com.ryc.api.v2.application.infra.mapper.ApplicationSubmissionIdempotencyMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicationSubmissionIdempotencyRepositoryImpl
    implements ApplicationSubmissionIdempotencyRepository {

  private final ApplicationSubmissionIdempotencyJpaRepository jpaRepository;

  @Override
  public ApplicationSubmissionIdempotency save(ApplicationSubmissionIdempotency idempotency) {
    ApplicationSubmissionIdempotencyEntity savedEntity =
        jpaRepository.saveAndFlush(ApplicationSubmissionIdempotencyMapper.toEntity(idempotency));
    return ApplicationSubmissionIdempotencyMapper.toDomain(savedEntity);
  }

  @Override
  public void complete(String id, String applicantId, String applicationId) {
    ApplicationSubmissionIdempotencyEntity entity =
        jpaRepository
            .findById(id)
            .orElseThrow(() -> new NoSuchElementException("멱등키 예약 정보를 찾을 수 없습니다: " + id));
    entity.complete(applicantId, applicationId);
    jpaRepository.flush();
  }

  @Override
  public Optional<ApplicationSubmissionIdempotency> findByAnnouncementIdAndIdempotencyKey(
      String announcementId, String idempotencyKey) {
    return jpaRepository
        .findByAnnouncementIdAndIdempotencyKey(announcementId, idempotencyKey)
        .map(ApplicationSubmissionIdempotencyMapper::toDomain);
  }
}
