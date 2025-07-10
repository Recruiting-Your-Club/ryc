package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ClubErrorCode implements ErrorCode {
  DUPLICATE_CLUB_NAME(HttpStatus.BAD_REQUEST, "Club name already exists"),
  CLUB_NOT_FOUND(HttpStatus.NOT_FOUND, "Club not found"),
  CLUB_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "Club member not found"),
  CLUB_MEMBER_ALREADY_EXISTS(HttpStatus.BAD_REQUEST, "Club member already exists"),
  CLUB_OWNER_CANNOT_BE_DELETED(HttpStatus.BAD_REQUEST, "Club owner cannot be deleted");

  private final HttpStatus httpStatus;
  private final String message;
}
