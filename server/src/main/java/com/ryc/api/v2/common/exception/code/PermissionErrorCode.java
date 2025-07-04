package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PermissionErrorCode implements ErrorCode {
  FORBIDDEN_NOT_CLUB_OWNER(HttpStatus.FORBIDDEN, "You are not the club owner. Access forbidden."),
  FORBIDDEN_NOT_CLUB_MEMBER(HttpStatus.FORBIDDEN, "You are not the club member. Access forbidden.");

  private final HttpStatus httpStatus;
  private final String message;
}
