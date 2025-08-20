package com.ryc.api.v2.applicationForm.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionCategory;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;
import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class QuestionValidator extends DomainValidator {

  private QuestionValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  // 공통 상수
  private static final int MAX_QUESTION_LABEL_LENGTH = 500;
  private static final int MAX_QUESTION_DESCRIPTION_LENGTH = 200;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id,
      String label,
      String description,
      boolean isRequired,
      List<QuestionOption> options,
      QuestionType questionType,
      QuestionCategory category) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateLabel(label);
    validateDescription(description);
    validateIsRequired(isRequired);
    validateOptions(options);
    validateQuestionType(questionType);
    validateCategory(category);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, QUESTION_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, QUESTION_INVALID_ID_FORMAT);
  }

  private static void validateLabel(String label) {
    validateNotNullOrEmpty(label, QUESTION_LABEL_NULL_OR_EMPTY);
    validateMaxLength(label, MAX_QUESTION_LABEL_LENGTH, QUESTION_LABEL_TOO_LONG);
  }

  private static void validateDescription(String description) {
    // 기존에 정제되기 때문에 Empty Check 불필요
    if (description != null) {
      validateMaxLength(
          description, MAX_QUESTION_DESCRIPTION_LENGTH, QUESTION_DESCRIPTION_TOO_LONG);
    }
  }

  private static void validateIsRequired(boolean isRequired) {
    validateNotNull(isRequired, QUESTION_IS_REQUIRED_NULL);
  }

  private static void validateOptions(List<QuestionOption> options) {
    validateNotNull(options, QUESTION_OPTIONS_NULL);
  }

  private static void validateQuestionType(QuestionType questionType) {
    validateNotNull(questionType, QUESTION_TYPE_NULL);
  }

  private static void validateCategory(QuestionCategory category) {
    validateNotNull(category, QUESTION_CATEGORY_NULL);
  }
}
