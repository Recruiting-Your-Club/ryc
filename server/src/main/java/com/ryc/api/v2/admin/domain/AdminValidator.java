package com.ryc.api.v2.admin.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

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
    validateId(id);
    validateName(name);
    validateEmail(email);
    validateBCryptPassword(password);
    validateImageUrl(imageUrl);
    validateThumbnailUrl(thumbnailUrl);
    validateAdminDefaultRole(adminDefaultRole);
    validateIsDeleted(isDeleted);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, ADMIN_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, ADMIN_INVALID_ID_FORMAT);
  }

  private static void validateName(String name) {
    validateNotNullOrEmpty(name, ADMIN_NAME_NULL_OR_EMPTY);
    validateLengthRange(name, MIN_NAME_LENGTH, MAX_NAME_LENGTH, ADMIN_INVALID_NAME_LENGTH);
    validatePattern(name, NAME_PATTERN, ADMIN_INVALID_NAME_FORMAT);
  }

  /** RFC 5322 준수 Email */
  private static void validateEmail(String email) {
    validateNotNullOrEmpty(email, ADMIN_EMAIL_NULL_OR_EMPTY);
    validateMaxLength(email, MAX_EMAIL_LENGTH, ADMIN_EMAIL_TOO_LONG);
    validateContains(email, EMAIL_AT_SYMBOL, ADMIN_EMAIL_MISSING_AT_SYMBOL);

    int atIndex = email.indexOf(EMAIL_AT_SYMBOL);
    String localPart = email.substring(0, atIndex);
    String domainPart = email.substring(atIndex + 1);

    // 로컬파트 길이 검증
    validateLengthRange(
        localPart,
        MIN_EMAIL_LOCAL_PART_LENGTH,
        MAX_EMAIL_LOCAL_PART_LENGTH,
        ADMIN_EMAIL_LOCAL_PART_INVALID_LENGTH);

    // 도메인부 길이 검증 (RFC 5321: 도메인 최대 253자)
    validateNotNullOrEmpty(domainPart, ADMIN_EMAIL_DOMAIN_PART_NULL_OR_EMPTY);
    validateMaxLength(domainPart, MAX_EMAIL_DOMAIN_PART_LENGTH, ADMIN_EMAIL_DOMAIN_PART_TOO_LONG);

    // RFC 5322 정규식 검증
    validatePattern(email, EMAIL_PATTERN, ADMIN_INVALID_EMAIL_FORMAT);
  }

  /** Password, BCrypt 암호화 준수 */
  private static void validateBCryptPassword(String password) {
    validateNotNullOrEmpty(password, ADMIN_PASSWORD_NULL_OR_EMPTY);

    // BCrypt 해시 형식 검증
    validatePattern(password, PASSWORD_BCRYPT_PATTERN, ADMIN_INVALID_BCRYPT_PASSWORD_FORMAT);
    validateExactLength(
        password, PASSWORD_BCRYPT_HASH_LENGTH, ADMIN_INVALID_BCRYPT_PASSWORD_LENGTH);
  }

  private static void validateImageUrl(String imageUrl) {
    // TODO: S3 구성이후 유효성 규칙 수정 필요
  }

  private static void validateThumbnailUrl(String thumbnailUrl) {
    // TODO: S3 구성이후 유효성 규칙 수정 필요
  }

  private static void validateAdminDefaultRole(AdminDefaultRole adminDefaultRole) {
    validateNotNull(adminDefaultRole, ADMIN_DEFAULT_ROLE_NULL);
  }

  private static void validateIsDeleted(Boolean isDeleted) {
    validateNotNull(isDeleted, ADMIN_IS_DELETED_NULL);
  }
}
