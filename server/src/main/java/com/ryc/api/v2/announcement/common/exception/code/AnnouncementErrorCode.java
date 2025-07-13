package com.ryc.api.v2.announcement.common.exception.code;

import org.springframework.http.HttpStatus;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum AnnouncementErrorCode implements ErrorCode {
  // 기간 존재 여부 관련 에러
  INTERVIEW_PERIOD_REQUIRED(HttpStatus.CONFLICT, "면접을 진행할 경우, 면접 기간은 필수입니다."),
  DOCUMENT_RESULT_PERIOD_REQUIRED(HttpStatus.CONFLICT, "면접을 진행할 경우, 서류 결과 발표 기간은 필수입니다."),
  INTERVIEW_PERIOD_NOT_ALLOWED(HttpStatus.CONFLICT, "면접을 진행하지 않을 경우, 면접 기간을 설정할 수 없습니다."),
  DOCUMENT_RESULT_PERIOD_NOT_ALLOWED(
      HttpStatus.CONFLICT, "면접을 진행하지 않을 경우, 서류 결과 발표 기간을 설정할 수 없습니다."),

  // 기간 순서 관련 에러
  INVALID_PERIOD_SEQUENCE(HttpStatus.CONFLICT, "기간 순서가 올바르지 않습니다."), // 범용 메시지
  DOCUMENT_PERIOD_MUST_BE_AFTER_APPLICATION(HttpStatus.CONFLICT, "서류 결과 발표 기간은 지원 기간 이후여야 합니다."),
  INTERVIEW_PERIOD_MUST_BE_AFTER_DOCUMENT(HttpStatus.CONFLICT, "면접 기간은 서류 결과 발표 기간 이후여야 합니다."),
  FINAL_RESULT_PERIOD_MUST_BE_AFTER_INTERVIEW(HttpStatus.CONFLICT, "최종 결과 발표 기간은 면접 기간 이후여야 합니다."),
  FINAL_RESULT_PERIOD_MUST_BE_AFTER_APPLICATION(
      HttpStatus.CONFLICT, "최종 결과 발표 기간은 지원 기간 이후여야 합니다."),

  // 기간 관련
  PERIOD_NOT_MODIFIABLE(HttpStatus.CONFLICT, "공고는 모집 완료 상태로 생성 또는 수정할 수 없습니다."),
  INVALID_ANNOUNCEMENT_STATUS(HttpStatus.CONFLICT, "업데이트 시 공고는 모집예정 상태여야 합니다."),
  // application Error
  MISSING_REQUIRED_PERSONAL_INFO(HttpStatus.CONFLICT, "필수 개인정보 질문(이름, 이메일)이 반드시 포함되어야 합니다."),
  QUESTION_OPTIONS_NOT_ALLOWED(HttpStatus.CONFLICT, "서술형/단답형 질문에는 선택지를 추가할 수 없습니다."),
  INSUFFICIENT_QUESTION_OPTIONS(HttpStatus.CONFLICT, "객관식 질문에는 최소 2개 이상의 선택지가 필요합니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
