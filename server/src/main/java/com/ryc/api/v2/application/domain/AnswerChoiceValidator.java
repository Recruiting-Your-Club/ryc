package com.ryc.api.v2.application.domain;

import java.util.regex.Pattern;

import lombok.AccessLevel;
import lombok.Builder;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class AnswerChoiceValidator {

  private AnswerChoiceValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  /**
   * 문자열 정제 메소드
   *
   * @param string
   * @return null Or Trimed String
   */
  private static String sanitizeString(String string) {
    return string != null ? string.trim() : null;
  }

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스 */
  static ValidatedAnswerChoice validateAndSanitize(String id, String optionId) {

    // 정제 (현재 AnswerChoice에는 정제할 문자열 필드가 없음)

    // 검증
    validateId(id);
    validateOptionId(optionId);

    return ValidatedAnswerChoice.builder().id(id).optionId(optionId).build();
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    if (id == null || id.isEmpty()) {
      throw new IllegalArgumentException("Id cannot be null or empty");
    }

    if (!UUID_PATTERN.matcher(id).matches()) {
      throw new IllegalArgumentException(
          "Id must be a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
    }
  }

  private static void validateOptionId(String optionId) {
    if (optionId == null || optionId.isEmpty()) {
      throw new IllegalArgumentException("OptionId cannot be null or empty");
    }

    if (!UUID_PATTERN.matcher(optionId).matches()) {
      throw new IllegalArgumentException(
          "OptionId must be a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
    }
  }

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedAnswerChoice(String id, String optionId) {}
}
