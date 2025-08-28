package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EmailErrorCode implements ErrorCode {
  EMAIL_VERIFICATION_CODE_EXPIRED(HttpStatus.CONFLICT, "이메일 인증 코드가 만료되었습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
