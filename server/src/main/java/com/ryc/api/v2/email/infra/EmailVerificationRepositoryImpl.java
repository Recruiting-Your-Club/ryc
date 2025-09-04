package com.ryc.api.v2.email.infra;

import java.util.NoSuchElementException;

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

  @Override
  public EmailVerification findByEmail(String email) {
    EmailVerificationEntity entity =
        jpaRepository
            .findByEmail(email)
            .orElseThrow(() -> new NoSuchElementException("이메일에 대한 인증 정보가 없습니다."));
    return EmailVerificationMapper.toDomain(entity);
  }

  @Override
  public EmailVerification findByCode(int code) {
    EmailVerificationEntity entity =
        jpaRepository
            .findById(code)
            .orElseThrow(() -> new NoSuchElementException("코드에 대한 인증 정보가 없습니다."));
    return EmailVerificationMapper.toDomain(entity);
  }

  @Override
  public void deleteByCode(int code) {
    jpaRepository.deleteById(code);
  }

  @Override
  public void flush() {
    jpaRepository.flush();
  }

  @Override
  public void deleteAttemptedCodes() {
    jpaRepository.deleteByAttempted(true);
  }
}
