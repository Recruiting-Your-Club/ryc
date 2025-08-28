package com.ryc.api.v2.email.domain;

import java.time.LocalDateTime;

import com.ryc.api.v2.common.exception.code.EmailErrorCode;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class EmailVerification {

  private Integer code;

  private String email;

  private Boolean verified; // 이메일 인증 여부

  private Boolean attempted; // 인증 시도 여부

  private LocalDateTime expiresAt;

  public static EmailVerification initialize(String email) {
    return EmailVerification.builder()
        .code((int) (Math.random() * 900000) + 100000) // 6자리 랜덤 코드 생성
        .email(email)
        .verified(false)
        .attempted(false)
        .expiresAt(LocalDateTime.now().plusMinutes(3))
        .build();
  }

  public EmailVerification verify() {
    if (verified) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_ALREADY_VERIFIED);
    }

    if (LocalDateTime.now().isAfter(expiresAt)) {
      throw new BusinessRuleException(EmailErrorCode.EMAIL_VERIFICATION_CODE_EXPIRED);
    }

    return EmailVerification.builder()
        .code(this.code)
        .email(this.email)
        .verified(true)
        .expiresAt(this.expiresAt)
        .build();
  }

  public EmailVerification attempt() {
    // 이미 인증된 경우나 시도된 경우 예외 처리
    if (!verified || attempted) {
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
