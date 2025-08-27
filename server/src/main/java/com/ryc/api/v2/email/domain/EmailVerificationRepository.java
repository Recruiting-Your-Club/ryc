package com.ryc.api.v2.email.domain;

public interface EmailVerificationRepository {

  EmailVerification save(EmailVerification emailVerified);

  boolean existsByEmail(String email);

  void deleteByEmail(String email);
}
