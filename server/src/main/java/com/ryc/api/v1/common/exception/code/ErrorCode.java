package com.ryc.api.v1.common.exception.code;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
  String name();

  HttpStatus getHttpStatus();

  String getMessage();
}
