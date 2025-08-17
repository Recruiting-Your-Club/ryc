package com.ryc.api.v2.applicant.domain;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;

import lombok.AccessLevel;
import lombok.Builder;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ApplicantValidator {

  private ApplicantValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern NAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z][가-힣a-zA-Z0-9\\s._-]*$");
  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");

  private static final int MIN_NAME_LENGTH = 2;
  private static final int MAX_NAME_LENGTH = 30;
  private static final int MAX_EMAIL_LENGTH = 320;
  private static final int MIN_EMAIL_LOCAL_PART_LENGTH = 1;
  private static final int MAX_EMAIL_LOCAL_PART_LENGTH = 64;

  /**
   * 문자열 정제 메소드
   *
   * @param string
   * @return null Or Trimed String
   */
  private static String sanitizeString(String string) {
    return string != null ? string.trim() : null;
  }

  /**
   * 이메일 정제 메소드 (trim + 소문자 변환)
   *
   * @param email
   * @return null Or Trimed and Lowercased Email
   */
  private static String sanitizeEmail(String email) {
    return email != null ? email.trim().toLowerCase() : null;
  }

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스 */
  static ValidatedApplicant validateAndSanitize(
      String id,
      String announcementId,
      String email,
      String name,
      ApplicantStatus status,
      Boolean isDeleted,
      List<ApplicantPersonalInfo> personalInfos) {
    // 정제
    String resolvedEmail = sanitizeEmail(email);
    String resolvedName = sanitizeString(name);

    // 선택 멤버 변수 기본값 처리
    Boolean resolvedIsDeleted = isDeleted != null ? isDeleted : Boolean.FALSE;

    // 검증
    validateId(id);
    validateAnnouncementId(announcementId);
    validateEmail(resolvedEmail);
    validateName(resolvedName);
    validateStatus(status);
    validateIsDeleted(resolvedIsDeleted);
    validatePersonalInfos(personalInfos);

    return ValidatedApplicant.builder()
        .id(id)
        .announcementId(announcementId)
        .email(resolvedEmail)
        .name(resolvedName)
        .status(status)
        .isDeleted(resolvedIsDeleted)
        .personalInfos(personalInfos)
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

  private static void validateAnnouncementId(String announcementId) {
    if (announcementId == null || announcementId.isEmpty()) {
      throw new IllegalArgumentException("AnnouncementId cannot be null or empty");
    }

    if (!UUID_PATTERN.matcher(announcementId).matches()) {
      throw new IllegalArgumentException(
          "AnnouncementId must be a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
    }
  }

  /** RFC 5322 준수 Email */
  private static void validateEmail(String email) {
    if (email == null || email.isEmpty()) {
      throw new IllegalArgumentException("Applicant Email cannot be null or empty");
    }

    // RFC 5321 최대 길이 검증
    if (email.length() > MAX_EMAIL_LENGTH) {
      throw new IllegalArgumentException("Applicant Email cannot exceed 320 characters");
    }

    // 로컬파트 길이 검증
    int atIndex = email.indexOf('@');
    if (atIndex >= MIN_EMAIL_LOCAL_PART_LENGTH && atIndex <= MAX_EMAIL_LOCAL_PART_LENGTH) {
    } else if (atIndex > MAX_EMAIL_LOCAL_PART_LENGTH) {
      throw new IllegalArgumentException("Applicant Email local part cannot exceed 64 characters");
    }

    // RFC 5322 제약사항 통합 정규식 검증
    if (!EMAIL_PATTERN.matcher(email).matches()) {
      throw new IllegalArgumentException(
          "Invalid Applicant email format according to RFC 5322 standards");
    }
  }

  private static void validateName(String name) {
    if (name == null || name.isEmpty()) {
      throw new IllegalArgumentException("Applicant Name cannot be null or empty");
    }

    if (name.length() < MIN_NAME_LENGTH) {
      throw new IllegalArgumentException(
          "Applicant Name must be at least " + MIN_NAME_LENGTH + " characters");
    }
    if (name.length() > MAX_NAME_LENGTH) {
      throw new IllegalArgumentException(
          "Applicant Name cannot exceed " + MAX_NAME_LENGTH + " characters");
    }

    if (!NAME_PATTERN.matcher(name).matches()) {
      throw new IllegalArgumentException(
          "Applicant Name can only contain Korean, English letters, numbers, spaces, dots, underscores, and hyphens. Must start with a letter.");
    }
  }

  private static void validateStatus(ApplicantStatus status) {
    if (status == null) {
      throw new IllegalArgumentException("ApplicantStatus cannot be null");
    }
  }

  private static void validateIsDeleted(Boolean isDeleted) {
    if (isDeleted == null) {
      throw new IllegalArgumentException("IsDeleted cannot be null");
    }
  }

  private static void validatePersonalInfos(List<ApplicantPersonalInfo> personalInfos) {
    // 빈 객체 사용 가능
    if (personalInfos == null) {
      throw new IllegalArgumentException("PersonalInfos cannot be null");
    }
  }

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedApplicant(
      String id,
      String announcementId,
      String email,
      String name,
      ApplicantStatus status,
      Boolean isDeleted,
      List<ApplicantPersonalInfo> personalInfos) {}
}
