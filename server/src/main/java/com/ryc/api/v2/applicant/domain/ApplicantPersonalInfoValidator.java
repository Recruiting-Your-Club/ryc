package com.ryc.api.v2.applicant.domain;

import java.util.regex.Pattern;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import lombok.AccessLevel;
import lombok.Builder;

final class ApplicantPersonalInfoValidator {
  private ApplicantPersonalInfoValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern NAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z][가-힣a-zA-Z0-9\\s._-]*$");
  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");
  private static final Pattern STUDENT_ID_PATTERN = Pattern.compile("^[0-9]{8,12}$");
  private static final Pattern PHONE_NUMBER_PATTERN =
      Pattern.compile("^01[0-9]-[0-9]{4}-[0-9]{4}$");
  private static final Pattern S3_URL_PATTERN =
      Pattern.compile(
          "^https://(?:"
              + "[a-z0-9.-]+\\.s3\\.(?:[a-z0-9-]+\\.)?amazonaws\\.com|"
              + "s3\\.(?:[a-z0-9-]+\\.)?amazonaws\\.com/[a-z0-9.-]+"
              + ")/.*$",
          Pattern.CASE_INSENSITIVE);
  private static final Pattern IMAGE_EXTENSION_PATTERN =
      Pattern.compile(".*\\.(jpg|jpeg|png|gif|webp|bmp)(?:\\?.*)?$", Pattern.CASE_INSENSITIVE);

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

  /**
   * 유효성 검증 진입점 접근 제한자 private-package 준수 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스 정제값 없는 경우, 별도
   * dto 반환 값 없음
   */
  static ValidatedApplicantPersonalInfo validateAndSanitize(
      String id, PersonalInfoQuestionType questionType, String value) {

    // 정제
    String resolvedValue;
    if (questionType.equals(PersonalInfoQuestionType.EMAIL)) resolvedValue = sanitizeEmail(value);
    else resolvedValue = sanitizeString(value);

    // 검증
    validateId(id);
    validateQuestionType(questionType);
    validateValueByQuestionType(questionType, resolvedValue);

    return ValidatedApplicantPersonalInfo.builder()
        .id(id)
        .questionType(questionType)
        .value(resolvedValue)
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

  private static void validateQuestionType(PersonalInfoQuestionType questionType) {
    if (questionType == null) {
      throw new IllegalArgumentException("PersonalInfoQuestionType cannot be null");
    }
  }

  private static void validateValueByQuestionType(
      PersonalInfoQuestionType questionType, String value) {
    if (value == null || value.isEmpty()) {
      throw new IllegalArgumentException("Value cannot be null or empty");
    }

    switch (questionType) {
      case STUDENT_ID -> validateStudentId(value);
      case PHONE_NUMBER -> validatePhoneNumber(value);
      case PROFILE_IMAGE -> validateImageUrl(value);
      case NAME -> validateName(value);
      case EMAIL -> validateEmail(value);
    }
  }

  private static void validateStudentId(String studentId) {
    if (!STUDENT_ID_PATTERN.matcher(studentId).matches()) {
      throw new IllegalArgumentException("Student ID must be 8-12 digits");
    }
  }

  private static void validatePhoneNumber(String phoneNumber) {
    if (!PHONE_NUMBER_PATTERN.matcher(phoneNumber).matches()) {
      throw new IllegalArgumentException("Phone number must be in format: 01X-XXXX-XXXX");
    }
  }

  // TODO: S3 구성이후 유효성 규칙 수정 필요
  private static void validateImageUrl(String imageUrl) {
    if (imageUrl == null || imageUrl.isEmpty()) {
      throw new IllegalArgumentException("Image URL cannot be null or empty");
    }

    // S3 URL 패턴 검증
    if (!S3_URL_PATTERN.matcher(imageUrl).matches()) {
      throw new IllegalArgumentException("Image URL must be a valid S3 URL");
    }

    // 이미지 파일 확장자 검증
    if (!IMAGE_EXTENSION_PATTERN.matcher(imageUrl).matches()) {
      throw new IllegalArgumentException(
          "Image URL must have a valid image file extension (jpg, jpeg, png, gif, webp, bmp)");
    }

    // HTTPS 강제 (보안)
    if (!imageUrl.startsWith("https://")) {
      throw new IllegalArgumentException("Image URL must use HTTPS protocol");
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

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedApplicantPersonalInfo(
      String id, PersonalInfoQuestionType questionType, String value) {}
}
