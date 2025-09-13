package com.ryc.api.v2.common.exception.code;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum InterviewErrorCode implements ErrorCode {
  INTERVIEW_SLOT_FULL(HttpStatus.CONFLICT, "해당 면접 슬롯의 예약이 모두 찼습니다."),
  INTERVIEW_SLOT_PERIOD_INVALID(HttpStatus.BAD_REQUEST, "면접 슬롯의 시작일과 종료일은 같은 날짜여야 합니다."),
  INTERVIEW_SLOT_ALREADY_EXISTS(HttpStatus.CONFLICT, "해당 면접 슬롯이 이미 존재합니다."),
  INTERVIEW_SLOT_ALREADY_RESERVED(HttpStatus.CONFLICT, "해당 면접 슬롯은 예약 정보가 존재합니다."),
  APPLICANT_ALREADY_RESERVED(HttpStatus.CONFLICT, "해당 지원자는 이미 면접을 예약하였습니다."),
  NEW_MAX_NUMBER_LESS_THAN_RESERVATIONS(HttpStatus.CONFLICT, "새로운 최대 인원이 현재 예약된 인원보다 적을 수 없습니다."),
  APPLICANT_STATUS_NOT_ELIGIBLE_FOR_INTERVIEW(HttpStatus.BAD_REQUEST, "지원자의 상태가 면접 예약에 적합하지 않습니다."),
  RELATIVE_HOUR_CANNOT_BE_NEGATIVE(HttpStatus.BAD_REQUEST, "면접 알림의 상대 시간은 음수일 수 없습니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
