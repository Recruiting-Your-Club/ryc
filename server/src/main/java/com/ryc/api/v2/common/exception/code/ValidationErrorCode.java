package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ValidationErrorCode implements ErrorCode {
  UUID(HttpStatus.CONFLICT, "해당 면접 슬롯의 예약이 모두 찼습니다.");

  private final HttpStatus httpStatus;
  private final String message;
}
