package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum InterviewErrorCode implements ErrorCode {
  INTERVIEW_SLOT_FULL(HttpStatus.CONFLICT, "해당 면접 슬롯의 예약이 모두 찼습니다."),
  INTERVIEW_SLOT_PERIOD_INVALID(HttpStatus.BAD_REQUEST, "면접 슬롯의 시작일과 종료일은 같은 날짜여야 합니다."),
  APPLICANT_ALREADY_RESERVED(HttpStatus.CONFLICT, "해당 지원자는 이미 면접을 예약하였습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
