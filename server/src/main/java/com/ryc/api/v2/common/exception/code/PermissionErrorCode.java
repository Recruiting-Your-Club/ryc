package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PermissionErrorCode implements ErrorCode {
  FORBIDDEN_NOT_CLUB_PRESIDENT(
      HttpStatus.FORBIDDEN, "You are not the club president. Access forbidden."),
  FORBIDDEN_NOT_CLUB_MEMBER(HttpStatus.FORBIDDEN, "You are not the club member. Access forbidden."),
  FORBIDDEN_NOT_CLUB_ANY_ROLE(
      HttpStatus.FORBIDDEN, "You don't have any club role. Access forbidden.");

  private final HttpStatus httpStatus;
  private final String message;
}
