package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ClubErrorCode implements ErrorCode {
  DUPLICATE_CLUB_NAME(HttpStatus.BAD_REQUEST, "동아리 이름은 중복될 수 없습니다."),
  CLUB_NOT_FOUND(HttpStatus.NOT_FOUND, "동아리를 찾을 수 없습니다."),
  CLUB_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "동아리원을 찾을 수 없습니다."),
  CLUB_MEMBER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "동아리원이 이미 존재합니다."),
  CLUB_OWNER_CANNOT_BE_DELETED(HttpStatus.BAD_REQUEST, "동아리 회장은 삭제할 수 없습니다.");

  private final HttpStatus httpStatus;
  private final String message;
}
