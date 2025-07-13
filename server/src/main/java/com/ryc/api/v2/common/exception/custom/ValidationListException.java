package com.ryc.api.v2.common.exception.custom;

import java.util.List;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ValidationListException extends RuntimeException {
  private final List<ErrorCode> errorCodes;
}
