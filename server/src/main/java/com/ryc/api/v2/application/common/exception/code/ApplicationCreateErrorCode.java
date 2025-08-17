package com.ryc.api.v2.application.common.exception.code;

import org.springframework.http.HttpStatus;

import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ApplicationCreateErrorCode implements ErrorCode {
  MISSING_REQUIRED_PERSONAL_INFO_ANSWER(HttpStatus.CONFLICT, "필수 개인정보 질문에 대한 답변이 누락되었습니다."),
  MISSING_REQUIRED_ANSWER(HttpStatus.CONFLICT, "필수 질문에 대한 답변이 누락되었습니다."),
  DUPLICATE_PERSONAL_INFO_ANSWER(HttpStatus.CONFLICT, "이름과 이메일은 개인정보 질문으로 중복 제출할 수 없습니다."),
  INVALID_QUESTION_ID(HttpStatus.CONFLICT, "제출된 답변의 질문 ID가 유효하지 않거나 해당 공고에 속하지 않습니다."),
  INVALID_ANSWER_FORMAT(HttpStatus.CONFLICT, "답변의 형식이 올바르지 않습니다."),
  ANNOUNCEMENT_NOT_RECRUITING(HttpStatus.CONFLICT, "공고 지원은 모집중 일때만 가능 합니다."),
  DUPLICATE_APPLICATION(HttpStatus.CONFLICT, "이미 해당 공고에 지원한 이메일 입니다."),
  ;

  private final HttpStatus httpStatus;
  private final String message;
}
