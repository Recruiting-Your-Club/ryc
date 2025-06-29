package com.ryc.api.v2.common.exception.custom;

import com.ryc.api.v2.common.exception.code.CommonErrorCode;
import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;

@Getter
public class DuplicateClubException extends RuntimeException {

  private final ErrorCode errorCode;

  public DuplicateClubException(String message) {
    super(message);
    errorCode = CommonErrorCode.INVALID_PARAMETER;
  }
}
