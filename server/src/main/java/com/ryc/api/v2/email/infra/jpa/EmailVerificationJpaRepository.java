package com.ryc.api.v2.email.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.email.infra.entity.EmailVerificationEntity;

public interface EmailVerificationJpaRepository
    extends JpaRepository<EmailVerificationEntity, Integer> {

  boolean existsByEmail(String email);

  void deleteByEmail(String email);

  Optional<EmailVerificationEntity> findByEmail(String email);
}
