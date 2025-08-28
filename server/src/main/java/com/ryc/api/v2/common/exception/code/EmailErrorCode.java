package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EmailErrorCode implements ErrorCode {
  EMAIL_VERIFICATION_CODE_EXPIRED(HttpStatus.CONFLICT, "이메일 인증 코드가 만료되었습니다."),
  EMAIL_ALREADY_VERIFIED(HttpStatus.CONFLICT, "이메일은 이미 인증되었습니다."),
  EMAIL_VERIFICATION_CODE_BAD_REQUEST(
      HttpStatus.BAD_REQUEST, "요청 헤더에 X-EMAIL-VERIFICATION-CODE가 int형으로 필요합니다."),
  EMAIL_VERIFICATION_CODE_INVALID(HttpStatus.CONFLICT, "이메일 인증 코드를 통해 이메일을 인증하지 않았습니다."),
  EMAIL_VERIFICATION_CODE_ALREADY_ATTEMPTED(HttpStatus.CONFLICT, "이메일 인증 코드는 이미 시도되었습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
