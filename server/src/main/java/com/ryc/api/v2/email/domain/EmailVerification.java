package com.ryc.api.v2.email.domain;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import com.ryc.api.v2.common.exception.code.EmailErrorCode;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EmailVerification {

  private static final SecureRandom random = new SecureRandom();
  private static final int DEFAULT_TTL_MINUTES = 3;

  private final Integer code;

  private final String email;

  private final Boolean verified; // 이메일 인증 여부

  private final Boolean attempted; // 인증 시도 여부

  private final LocalDateTime expiresAt;

  public static EmailVerification initialize(String email) {
    return EmailVerification.builder()
        .code(random.nextInt(900_000) + 100_000) // 6자리 랜덤 코드 생성
        .email(email)
        .verified(false)
        .attempted(false)
        .expiresAt(LocalDateTime.now().plusMinutes(DEFAULT_TTL_MINUTES))
        .build();
  }

  public EmailVerification verify(int inputCode) {
    if (verified) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_ALREADY_VERIFIED);
    }

    if (LocalDateTime.now().isAfter(expiresAt)) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_EXPIRED);
    }

    if (inputCode != code) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_INVALID);
    }

    return EmailVerification.builder()
        .code(this.code)
        .email(this.email)
        .verified(true)
        .attempted(this.attempted)
        .expiresAt(this.expiresAt)
        .build();
  }

  public EmailVerification attempt() {
    // 이미 인증된 경우나 시도된 경우 예외 처리
    if (!verified) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_INVALID);
    }
    if (attempted) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_ALREADY_ATTEMPTED);
    }

    return EmailVerification.builder()
        .code(this.code)
        .email(this.email)
        .verified(this.verified)
        .attempted(true)
        .expiresAt(this.expiresAt)
        .build();
  }
}
