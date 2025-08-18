package com.ryc.api.v2.application.domain;

import java.util.List;
import java.util.regex.Pattern;

import lombok.AccessLevel;
import lombok.Builder;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class AnswerValidator {

  private AnswerValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final int MAX_TEXT_ANSWER_LENGTH = 5000;

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
  static ValidatedAnswer validateAndSanitize(
      String id,
      String questionId,
      String textAnswer,
      List<AnswerChoice> choices,
      String fileMetadataId) {

    // 정제
    String resolvedTextAnswer = sanitizeString(textAnswer);

    // 검증
    validateId(id);
    validateQuestionId(questionId);
    validateTextAnswer(resolvedTextAnswer);
    validateChoices(choices);
    validateFileMetadataId(fileMetadataId);

    return ValidatedAnswer.builder()
        .id(id)
        .questionId(questionId)
        .textAnswer(resolvedTextAnswer)
        .choices(choices)
        .fileMetadataId(fileMetadataId)
        .build();
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

  private static void validateQuestionId(String questionId) {
    if (questionId == null || questionId.isEmpty()) {
      throw new IllegalArgumentException("QuestionId cannot be null or empty");
    }

    if (!UUID_PATTERN.matcher(questionId).matches()) {
      throw new IllegalArgumentException(
          "QuestionId must be a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
    }
  }

  private static void validateTextAnswer(String textAnswer) {
    // textAnswer는 null 허용 (선택 사항)
    if (textAnswer != null && textAnswer.length() > MAX_TEXT_ANSWER_LENGTH) {
      throw new IllegalArgumentException(
          "TextAnswer cannot exceed " + MAX_TEXT_ANSWER_LENGTH + " characters");
    }
  }

  private static void validateChoices(List<AnswerChoice> choices) {
    // Null 허용
  }

  private static void validateFileMetadataId(String fileMetadataId) {
    // fileMetadataId는 null 허용 (선택 사항)
    if (fileMetadataId != null && !fileMetadataId.isEmpty()) {
      // TODO: S3 메타데이터 id 포멧으로 수정
      if (!UUID_PATTERN.matcher(fileMetadataId).matches()) {
        throw new IllegalArgumentException("");
      }
    }
  }

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedAnswer(
      String id,
      String questionId,
      String textAnswer,
      List<AnswerChoice> choices,
      String fileMetadataId) {}
}
