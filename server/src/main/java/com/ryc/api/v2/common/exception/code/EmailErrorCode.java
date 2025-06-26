package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum EmailErrorCode implements ErrorCode {
  EMAIL_SEND_FAILED(
      HttpStatus.INTERNAL_SERVER_ERROR, "Failed to send email. Please try again later."),
  EMAIL_RECIPIENT_NOT_FOUND(HttpStatus.NOT_FOUND, "Email recipient not found in the system.");

  private final HttpStatus httpStatus;
  private final String message;
}
