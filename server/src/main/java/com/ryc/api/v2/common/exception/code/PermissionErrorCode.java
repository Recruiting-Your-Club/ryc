package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PermissionErrorCode implements ErrorCode {
  FORBIDDEN_NOT_CLUB_OWNER(HttpStatus.FORBIDDEN, "동아리 회장이 아닙니다. 접근이 금지되었습니다."),
  FORBIDDEN_NOT_CLUB_MEMBER(HttpStatus.FORBIDDEN, "동아리원이 아닙니다. 접근이 금지되었습니다."),;

  private final HttpStatus httpStatus;
  private final String message;
}
