package com.ryc.api.v2.evaluation.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class EvaluationValidator extends DomainValidator {

  private EvaluationValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  // 공통 상수
  private static final BigDecimal MIN_SCORE = new BigDecimal("0.0");
  private static final BigDecimal MAX_SCORE = new BigDecimal("5.0");
  private static final int SCORE_SCALE = 1;
  private static final int MAX_COMMENT_LENGTH = 500;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id,
      String evaluatorId,
      String evaluateeId,
      BigDecimal score,
      String comment,
      EvaluationType type,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateEvaluatorId(evaluatorId);
    validateEvaluateeId(evaluateeId);
    validateScore(score);
    validateComment(comment);
    validateType(type);
    validateCreatedAt(id, createdAt);
    validateUpdatedAt(id, updatedAt);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, EVALUATION_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, EVALUATION_INVALID_ID_FORMAT);
  }

  private static void validateEvaluatorId(String evaluatorId) {
    validateNotNullOrEmpty(evaluatorId, EVALUATION_EVALUATOR_ID_NULL_OR_EMPTY);
    validatePattern(evaluatorId, UUID_PATTERN, EVALUATION_INVALID_EVALUATOR_ID_FORMAT);
  }

  private static void validateEvaluateeId(String evaluateeId) {
    validateNotNullOrEmpty(evaluateeId, EVALUATION_EVALUATEE_ID_NULL_OR_EMPTY);
    validatePattern(evaluateeId, UUID_PATTERN, EVALUATION_INVALID_EVALUATEE_ID_FORMAT);
  }

  private static void validateScore(BigDecimal score) {
    validateNotNull(score, EVALUATION_SCORE_NULL);
    validateBigDecimalRange(score, MIN_SCORE, MAX_SCORE, EVALUATION_SCORE_OUT_OF_RANGE);
    validateBigDecimalScale(score, SCORE_SCALE, EVALUATION_SCORE_INVALID_SCALE);
  }

  private static void validateComment(String comment) {
    // NULL 허용
    if (comment != null) {
      validateNotEmpty(comment, EVALUATION_COMMENT_EMPTY);
      validateMaxLength(comment, MAX_COMMENT_LENGTH, EVALUATION_COMMENT_TOO_LONG);
    }
  }

  private static void validateType(EvaluationType type) {
    validateNotNull(type, EVALUATION_TYPE_NULL);
  }

  // 영속성 레이어를 거친 경우에만 service에서 상태검증으로 null 제한 체크
  private static void validateCreatedAt(String id, LocalDateTime createdAt) {}

  // 영속성 레이어를 거친 경우에만 service에서 상태검증으로 null 제한 체크
  private static void validateUpdatedAt(String id, LocalDateTime updatedAt) {}
}
