package com.ryc.api.v2.admin.domain;

import java.util.regex.Pattern;

import lombok.AccessLevel;
import lombok.Builder;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class AdminValidator {

  private AdminValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern NAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z][가-힣a-zA-Z0-9\\s._-]*$");
  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");
  private static final Pattern PASSWORD_BCRYPT_PATTERN =
      Pattern.compile("^\\$2[abxy]?\\$\\d{2}\\$[A-Za-z0-9./]{53}$");
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
  private static final int PASSWORD_BCRYPT_HASH_LENGTH = 60;

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
  static ValidatedAdmin validateAndSanitize(
      String id,
      String name,
      String email,
      String password,
      String imageUrl,
      String thumbnailUrl,
      AdminDefaultRole adminDefaultRole,
      Boolean isDeleted) {
    // 정제
    String resolvedName = sanitizeString(name);
    String resolvedEmail = sanitizeEmail(email);
    String resolvedImageUrl = sanitizeString(imageUrl);
    String resolvedThumbnailUrl = sanitizeString(thumbnailUrl);

    // 선택 멤버 변수 기본값 처리
    AdminDefaultRole resolvedAdminDefaultRole =
        adminDefaultRole != null ? adminDefaultRole : AdminDefaultRole.USER;
    Boolean resolvedIsDeleted = isDeleted != null ? isDeleted : Boolean.FALSE;

    // 검증
    validateId(id);
    validateName(resolvedName);
    validateEmail(resolvedEmail);
    validatePassword(password);
    validateImageUrl(resolvedImageUrl);
    validateThumbnailUrl(resolvedThumbnailUrl);
    validateAdminDefaultRole(resolvedAdminDefaultRole);
    validateIsDeleted(resolvedIsDeleted);

    return ValidatedAdmin.builder()
        .id(id)
        .name(resolvedName)
        .email(resolvedEmail)
        .password(password)
        .imageUrl(resolvedImageUrl)
        .thumbnailUrl(resolvedThumbnailUrl)
        .adminDefaultRole(resolvedAdminDefaultRole)
        .isDeleted(resolvedIsDeleted)
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

  private static void validateName(String name) {
    if (name == null || name.isEmpty()) {
      throw new IllegalArgumentException("Name cannot be null or empty");
    }

    if (name.length() < MIN_NAME_LENGTH) {
      throw new IllegalArgumentException(
          "Name must be at least " + MIN_NAME_LENGTH + " characters");
    }
    if (name.length() > MAX_NAME_LENGTH) {
      throw new IllegalArgumentException("Name cannot exceed " + MAX_NAME_LENGTH + " characters");
    }

    if (!NAME_PATTERN.matcher(name).matches()) {
      throw new IllegalArgumentException(
          "Name can only contain Korean, English letters, numbers, spaces, dots, underscores, and hyphens. Must start with a letter.");
    }
  }

  /** RFC 5322 준수 Email */
  private static void validateEmail(String email) {
    if (email == null || email.isEmpty()) {
      throw new IllegalArgumentException("Email cannot be null or empty");
    }

    // RFC 5321 최대 길이 검증
    if (email.length() > MAX_EMAIL_LENGTH) {
      throw new IllegalArgumentException("Email cannot exceed 320 characters");
    }

    // 로컬파트 길이 검증
    int atIndex = email.indexOf('@');
    if (atIndex >= MIN_EMAIL_LOCAL_PART_LENGTH && atIndex <= MAX_EMAIL_LOCAL_PART_LENGTH) {
    } else if (atIndex > MAX_EMAIL_LOCAL_PART_LENGTH) {
      throw new IllegalArgumentException("Email local part cannot exceed 64 characters");
    }

    // RFC 5322 제약사항 통합 정규식 검증
    if (!EMAIL_PATTERN.matcher(email).matches()) {
      throw new IllegalArgumentException("Invalid email format according to RFC 5322 standards");
    }
  }

  /** Password, BCrypt 암호화 준수 */
  private static void validatePassword(String password) {
    if (password == null || password.isEmpty()) {
      throw new IllegalArgumentException("Password cannot be null or empty");
    }

    // BCrypt 해시 형식 검증
    if (!PASSWORD_BCRYPT_PATTERN.matcher(password).matches()) {
      throw new IllegalArgumentException("Password must be a valid BCrypt hash format");
    }

    if (password.length() != PASSWORD_BCRYPT_HASH_LENGTH) {
      throw new IllegalArgumentException(
          "BCrypt hash must be exactly " + PASSWORD_BCRYPT_HASH_LENGTH + " characters long");
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

  // TODO: S3 구성이후 유효성 규칙 수정 필요
  private static void validateThumbnailUrl(String thumbnailUrl) {
    if (thumbnailUrl == null || thumbnailUrl.isEmpty()) {
      throw new IllegalArgumentException("Thumbnail Image URL cannot be null or empty");
    }

    // S3 URL 패턴 검증
    if (!S3_URL_PATTERN.matcher(thumbnailUrl).matches()) {
      throw new IllegalArgumentException("Thumbnail URL must be a valid S3 URL");
    }

    // 이미지 파일 확장자 검증
    if (!IMAGE_EXTENSION_PATTERN.matcher(thumbnailUrl).matches()) {
      throw new IllegalArgumentException(
          "Thumbnail URL must have a valid image file extension (jpg, jpeg, png, gif, webp, bmp)");
    }

    // HTTPS 강제 (보안)
    if (!thumbnailUrl.startsWith("https://")) {
      throw new IllegalArgumentException("Thumbnail URL must use HTTPS protocol");
    }
  }

  private static void validateAdminDefaultRole(AdminDefaultRole adminDefaultRole) {
    if (adminDefaultRole == null) {
      throw new IllegalArgumentException("Admin Default Role cannot be null");
    }
  }

  private static void validateIsDeleted(Boolean isDeleted) {
    if (isDeleted == null) {
      throw new IllegalArgumentException("isDeleted cannot be null");
    }
  }

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedAdmin(
      String id,
      String name,
      String email,
      String password,
      String imageUrl,
      String thumbnailUrl,
      AdminDefaultRole adminDefaultRole,
      Boolean isDeleted) {}
}
