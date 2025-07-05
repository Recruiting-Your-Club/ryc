package com.ryc.api.v2.announcement.common.exception.custom;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class BusinessException extends RuntimeException {
  private final ErrorCode errorCode;
}
