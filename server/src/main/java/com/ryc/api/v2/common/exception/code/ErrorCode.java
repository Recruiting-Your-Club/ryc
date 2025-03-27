package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
  String name();

  HttpStatus getHttpStatus();

  String getMessage();
}
