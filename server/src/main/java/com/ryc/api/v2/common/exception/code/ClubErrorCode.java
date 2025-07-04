package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ClubErrorCode implements ErrorCode {
  DUPLICATE_CLUB_NAME(HttpStatus.BAD_REQUEST, "Club name already exists"),
  CLUB_NOT_FOUND(HttpStatus.NOT_FOUND, "Club not found");

  private final HttpStatus httpStatus;
  private final String message;
}
