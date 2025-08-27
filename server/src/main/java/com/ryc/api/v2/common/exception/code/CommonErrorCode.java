package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
  INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "올바르지 않은 요청 값이 있습니다."),
  RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, "자원을 찾을 수 없습니다."),
  DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "자원이 이미 존재합니다."),
  INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 내부 오류가 발생했습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
