package com.ryc.api.v2.application.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class AnswerValidator extends DomainValidator {

  private AnswerValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final int MAX_TEXT_ANSWER_LENGTH = 5000;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 */
  static void validate(
      String id,
      String questionId,
      String textAnswer,
      List<AnswerChoice> choices,
      String fileMetadataId) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateQuestionId(questionId);
    validateTextAnswer(textAnswer);
    validateChoices(choices);
    validateFileMetadataId(fileMetadataId);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, ANSWER_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, ANSWER_INVALID_ID_FORMAT);
  }

  private static void validateQuestionId(String questionId) {
    validateNotNullOrEmpty(questionId, ANSWER_QUESTION_ID_NULL_OR_EMPTY);
    validatePattern(questionId, UUID_PATTERN, ANSWER_INVALID_QUESTION_ID_FORMAT);
  }

  private static void validateTextAnswer(String textAnswer) {
    // textAnswer는 null 허용
    if (textAnswer != null) {
      validateNotEmpty(textAnswer, ANSWER_TEXT_ANSWER_EMPTY);
      validateMaxLength(textAnswer, MAX_TEXT_ANSWER_LENGTH, ANSWER_TEXT_ANSWER_TOO_LONG);
    }
  }

  private static void validateChoices(List<AnswerChoice> choices) {
    // 빈 리스트 허용
    validateNotNull(choices, ANSWER_CHOICES_NULL);
  }

  private static void validateFileMetadataId(String fileMetadataId) {
    // fileMetadataId는 null 허용
    if (fileMetadataId != null) {
      validateNotEmpty(fileMetadataId, ANSWER_INVALID_FILE_METADATA_ID_EMPTY);
      validatePattern(fileMetadataId, UUID_PATTERN, ANSWER_INVALID_FILE_METADATA_ID_FORMAT);
    }
  }
}
