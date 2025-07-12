package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum InterviewErrorCode implements ErrorCode {
  INTERVIEW_SLOT_NOT_FOUND(HttpStatus.NOT_FOUND, "면접 슬롯을 찾을 수 없습니다."),
  INTERVIEW_SLOT_FULL(HttpStatus.BAD_REQUEST, "해당 면접 슬롯의 예약이 모두 찼습니다."),
  INTERVIEW_RESERVATION_NOT_FOUND(HttpStatus.NOT_FOUND, "면접 예약을 찾을 수 없습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
