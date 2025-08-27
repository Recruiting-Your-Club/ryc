package com.ryc.api.v2.email.infra.mapper;

import com.ryc.api.v2.email.domain.EmailVerification;
import com.ryc.api.v2.email.infra.entity.EmailVerificationEntity;

public class EmailVerificationMapper {

  private EmailVerificationMapper() {
    // private constructor to prevent instantiation
  }

  public static EmailVerification toDomain(EmailVerificationEntity entity) {
    return EmailVerification.builder()
        .code(entity.getCode())
        .email(entity.getEmail())
        .verified(entity.getVerified())
        .expiresAt(entity.getExpiresAt())
        .build();
  }

  public static EmailVerificationEntity toEntity(EmailVerification domain) {
    return EmailVerificationEntity.builder()
        .code(domain.getCode())
        .email(domain.getEmail())
        .verified(domain.getVerified())
        .expiresAt(domain.getExpiresAt())
        .build();
  }
}
