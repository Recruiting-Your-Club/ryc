package com.ryc.api.v2.email.domain;

import java.time.LocalDateTime;

import com.ryc.api.v2.common.exception.code.EmailErrorCode;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmailVerification {

  private Integer code;
  private String email;
  private Boolean verified;
  private LocalDateTime expiresAt;

  public static EmailVerification initialize(String email) {
    return EmailVerification.builder()
        .code((int) (Math.random() * 900000) + 100000) // 6자리 랜덤 코드 생성
        .email(email)
        .verified(false)
        .expiresAt(LocalDateTime.now().plusMinutes(3))
        .build();
  }

  public EmailVerification verify() {
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
}
