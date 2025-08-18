package com.ryc.api.v2.admin.domain;

import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

/** Admin 도메인 전용 Validator */
final class AdminValidator extends DomainValidator {

  private AdminValidator() {}

  /** 공통 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern NAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z][가-힣a-zA-Z0-9\\s._-]*$");

  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");

  private static final Pattern PASSWORD_BCRYPT_PATTERN =
      Pattern.compile("^\\$2[abxy]?\\$\\d{2}\\$[A-Za-z0-9./]{53}$");

  // 공통 상수
  private static final int MIN_NAME_LENGTH = 2;
  private static final int MAX_NAME_LENGTH = 30;
  private static final int MAX_EMAIL_LENGTH = 320;
  private static final int MIN_EMAIL_LOCAL_PART_LENGTH = 1;
  private static final int MAX_EMAIL_LOCAL_PART_LENGTH = 64;
  private static final int MAX_EMAIL_DOMAIN_PART_LENGTH = 253;
  private static final int PASSWORD_BCRYPT_HASH_LENGTH = 60;
  private static final String EMAIL_AT_SYMBOL = "@";

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id,
      String name,
      String email,
      String password,
      String imageUrl,
      String thumbnailUrl,
      AdminDefaultRole adminDefaultRole,
      Boolean isDeleted) {

    // 공통 검증 메소드 사용
    validateId(id, "Admin Id");
    validateName(name, "Admin Name");
    validateEmail(email, "Admin Email");
    validateBCryptPassword(password, "Admin Password");
    validateImageUrl(imageUrl, "Admin Image URL");
    validateThumbnailUrl(thumbnailUrl, "Admin Thumbnail URL");
    validateAdminDefaultRole(adminDefaultRole, "Admin Default Role");
    validateIsDeleted(isDeleted, "Admin IsDeleted");
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id, String fieldName) {
    validateNotNullOrEmpty(id, fieldName);
    validatePattern(id, fieldName, UUID_PATTERN, "(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
  }

  private static void validateName(String name, String fieldName) {
    validateNotNullOrEmpty(name, fieldName);
    validateLengthRange(name, fieldName, MIN_NAME_LENGTH, MAX_NAME_LENGTH);
    validatePattern(
        name,
        fieldName,
        NAME_PATTERN,
        "Name can only contain Korean, English letters, numbers, spaces, dots, underscores, and hyphens. Must start with a letter.");
  }

  /** RFC 5322 준수 Email */
  private static void validateEmail(String email, String fieldName) {
    validateNotNullOrEmpty(email, fieldName);
    validateMaxLength(email, fieldName, MAX_EMAIL_LENGTH);
    validateContains(email, fieldName, EMAIL_AT_SYMBOL);

    int atIndex = email.indexOf(EMAIL_AT_SYMBOL);
    String localPart = email.substring(0, atIndex);
    String domainPart = email.substring(atIndex + 1);

    // 로컬파트 길이 검증
    validateLengthRange(
        localPart, "Email Local Part", MIN_EMAIL_LOCAL_PART_LENGTH, MAX_EMAIL_LOCAL_PART_LENGTH);

    // 도메인부 길이 검증 (RFC 5321: 도메인 최대 253자)
    validateNotNullOrEmpty(domainPart, "Email Domain Part");
    validateMaxLength(domainPart, "Email Domain Part", MAX_EMAIL_DOMAIN_PART_LENGTH);

    // RFC 5322 정규식 검증
    validatePattern(email, fieldName, EMAIL_PATTERN, "according to RFC 5322 standards");
  }

  /** Password, BCrypt 암호화 준수 */
  private static void validateBCryptPassword(String password, String fieldName) {
    validateNotNullOrEmpty(password, fieldName);

    // BCrypt 해시 형식 검증
    validatePattern(password, fieldName, PASSWORD_BCRYPT_PATTERN, "valid BCrypt hash format");
    validateExactLength(password, fieldName, PASSWORD_BCRYPT_HASH_LENGTH);
  }

  private static void validateImageUrl(String imageUrl, String fieldName) {
    // TODO: S3 구성이후 유효성 규칙 수정 필요
  }

  private static void validateThumbnailUrl(String thumbnailUrl, String fieldName) {
    // TODO: S3 구성이후 유효성 규칙 수정 필요
  }

  private static void validateAdminDefaultRole(
      AdminDefaultRole adminDefaultRole, String fieldName) {
    validateNotNull(adminDefaultRole, "Admin Default Role");
  }

  private static void validateIsDeleted(Boolean isDeleted, String fieldName) {
    validateNotNull(isDeleted, "Admin IsDeleted");
  }
}
