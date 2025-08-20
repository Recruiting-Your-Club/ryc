package com.ryc.api.v2.applicationForm.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class QuestionOptionValidator extends DomainValidator {

  private QuestionOptionValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  // 공통 상수
  private static final int MAX_OPTION_LENGTH = 200;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(String id, String option) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateOption(option);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, QUESTION_OPTION_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, QUESTION_OPTION_INVALID_ID_FORMAT);
  }

  private static void validateOption(String option) {
    validateNotNullOrEmpty(option, QUESTION_OPTION_OPTION_NULL_OR_EMPTY);
    validateMaxLength(option, MAX_OPTION_LENGTH, QUESTION_OPTION_OPTION_TOO_LONG);
  }
}
