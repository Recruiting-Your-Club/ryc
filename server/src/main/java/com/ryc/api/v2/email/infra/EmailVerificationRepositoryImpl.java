package com.ryc.api.v2.email.infra;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.email.domain.EmailVerification;
import com.ryc.api.v2.email.domain.EmailVerificationRepository;
import com.ryc.api.v2.email.infra.entity.EmailVerificationEntity;
import com.ryc.api.v2.email.infra.jpa.EmailVerificationJpaRepository;
import com.ryc.api.v2.email.infra.mapper.EmailVerificationMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EmailVerificationRepositoryImpl implements EmailVerificationRepository {

  private final EmailVerificationJpaRepository jpaRepository;

  @Override
  public EmailVerification save(EmailVerification emailVerified) {
    EmailVerificationEntity entity = EmailVerificationMapper.toEntity(emailVerified);
    EmailVerificationEntity savedEntity = jpaRepository.save(entity);
    return EmailVerificationMapper.toDomain(savedEntity);
  }

  @Override
  public boolean existsByEmail(String email) {
    return jpaRepository.existsByEmail(email);
  }

  @Override
  public void deleteByEmail(String email) {
    jpaRepository.deleteByEmail(email);
  }
}
