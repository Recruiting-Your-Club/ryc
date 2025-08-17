package com.ryc.api.v2.application.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

import lombok.AccessLevel;
import lombok.Builder;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ApplicationValidator {

  private ApplicationValidator() {}

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

  /** 유효성 검증 진입점 접근 제한자 private-package 준수
   * 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스
   */
  static ValidatedApplication validateAndSanitize(
      String id,
      String applicantId,
      List<Answer> answers,
      LocalDateTime createdAt) {
    
    // 선택 멤버 변수 기본값 처리
    LocalDateTime resolvedCreatedAt = createdAt != null ? createdAt : LocalDateTime.now();

    // 검증
    validateId(id);
    validateApplicantId(applicantId);
    validateAnswers(answers);
    validateCreatedAt(resolvedCreatedAt);

    return ValidatedApplication.builder()
        .id(id)
        .applicantId(applicantId)
        .answers(answers)
        .createdAt(resolvedCreatedAt)
        .build();
  }

  /**
   * 검증 private 헬퍼 메소드
   */

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

  private static void validateApplicantId(String applicantId) {
    if (applicantId == null || applicantId.isEmpty()) {
      throw new IllegalArgumentException("ApplicantId cannot be null or empty");
    }

    if (!UUID_PATTERN.matcher(applicantId).matches()) {
      throw new IllegalArgumentException(
          "ApplicantId must be a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
    }
  }

  private static void validateAnswers(List<Answer> answers) {
    if (answers == null) {
      throw new IllegalArgumentException("Answers cannot be null");
    }
  }

  private static void validateCreatedAt(LocalDateTime createdAt) {
    if (createdAt == null) {
      throw new IllegalArgumentException("CreatedAt cannot be null");
    }
  }

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedApplication(
      String id,
      String applicantId,
      List<Answer> answers,
      LocalDateTime createdAt) {}
}