package com.ryc.api.v2.email.domain;

import java.time.LocalDateTime;

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
}
