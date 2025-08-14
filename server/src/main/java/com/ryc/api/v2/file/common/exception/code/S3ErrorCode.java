package com.ryc.api.v2.file.common.exception.code;

import org.springframework.http.HttpStatus;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum S3ErrorCode implements ErrorCode {
  INVALID_FILE_TYPE(
      HttpStatus.BAD_REQUEST,
      "%s is invalid file type. (CLUB_PROFILE, ANNOUNCEMENT_IMAGE, APPLICATION_ATTACHMENT are allowed)"),
  REQUIRED_CONTENT_TYPE(HttpStatus.BAD_REQUEST, "Content-Type is required"),
  INVALID_CONTENT_TYPE(
      HttpStatus.BAD_REQUEST, "%s is invalid content type in %s. (%s are allowed)."),
  FILE_NOT_FOUND_AT_S3(HttpStatus.NOT_FOUND, "%s is not found at S3."),
  S3_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S3 server error"),
  ;
  private final HttpStatus httpStatus;
  private final String message;
}
