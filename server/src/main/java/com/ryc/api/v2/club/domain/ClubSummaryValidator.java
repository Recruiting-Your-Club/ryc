package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ClubSummaryValidator extends DomainValidator {

  private ClubSummaryValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  // 공통 상수
  private static final int MAX_TITLE_LENGTH = 20;
  private static final int MAX_CONTENT_LENGTH = 50;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(String id, String title, String content) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateTitle(title);
    validateContent(content);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, CLUB_SUMMARY_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, CLUB_SUMMARY_INVALID_ID_FORMAT);
  }

  private static void validateTitle(String title) {
    validateNotNullOrEmpty(title, CLUB_SUMMARY_TITLE_NULL_OR_EMPTY);
    validateMaxLength(title, MAX_TITLE_LENGTH, CLUB_SUMMARY_TITLE_TOO_LONG);
  }

  private static void validateContent(String content) {
    validateNotNullOrEmpty(content, CLUB_SUMMARY_CONTENT_NULL_OR_EMPTY);
    validateMaxLength(content, MAX_CONTENT_LENGTH, CLUB_SUMMARY_CONTENT_TOO_LONG);
  }
}
