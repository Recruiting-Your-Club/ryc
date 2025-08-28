package com.ryc.api.v2.application.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ApplicationValidator extends DomainValidator {

  private ApplicationValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id, String applicantId, List<Answer> answers, LocalDateTime createdAt) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateApplicantId(applicantId);
    validateAnswers(answers);
    validateCreatedAt(id, createdAt);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, APPLICATION_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, APPLICATION_INVALID_ID_FORMAT);
  }

  private static void validateApplicantId(String applicantId) {
    validateNotNullOrEmpty(applicantId, APPLICATION_APPLICANT_ID_NULL_OR_EMPTY);
    validatePattern(applicantId, UUID_PATTERN, APPLICATION_INVALID_APPLICANT_ID_FORMAT);
  }

  private static void validateAnswers(List<Answer> answers) {
    // 빈 리스트 허용
    validateNotNull(answers, APPLICATION_ANSWERS_NULL);
  }

  // 영속성 레이어를 거친 경우에만 service에서 상태검증으로 null 제한 체크
  private static void validateCreatedAt(String id, LocalDateTime createdAt) {}
}
