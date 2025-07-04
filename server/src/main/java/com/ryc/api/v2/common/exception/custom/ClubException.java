package com.ryc.api.v2.common.exception.custom;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ClubException extends RuntimeException {

  private final ErrorCode errorCode;
}
