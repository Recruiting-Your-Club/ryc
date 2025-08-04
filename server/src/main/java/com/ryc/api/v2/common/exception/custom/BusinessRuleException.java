package com.ryc.api.v2.common.exception.custom;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class BusinessRuleException extends RuntimeException {
  private final ErrorCode errorCode;
  private final Object[] params;

  public BusinessRuleException(ErrorCode errorCode, Object... params) {
    super(errorCode.getMessage());
    this.errorCode = errorCode;
    this.params = params;
  }

  public String getFormattedMessage() {
    if(params == null) {
      return errorCode.getMessage();
    }

    return String.format(errorCode.getMessage(), params);
  }
}
