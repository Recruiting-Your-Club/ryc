package com.ryc.api.v1.common.exception.custom;

import com.ryc.api.v1.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class NoPermissionException extends RuntimeException {
  private final ErrorCode errorCode;
}
