package com.ryc.api.v2.applicant.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.regex.Pattern;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.validator.DomainValidator;

final class ApplicantPersonalInfoValidator extends DomainValidator {
  private ApplicantPersonalInfoValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final Pattern NAME_PATTERN = Pattern.compile("^[가-힣a-zA-Z][가-힣a-zA-Z0-9\\s._-]*$");
  private static final Pattern EMAIL_PATTERN =
      Pattern.compile(
          "^[a-zA-Z0-9](?:[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\\.[a-zA-Z]{2,}$");
  private static final Pattern STUDENT_ID_PATTERN = Pattern.compile("^[0-9]{8}$");
  private static final Pattern PHONE_NUMBER_PATTERN = Pattern.compile("^01[0-9]{9}$");

  private static final int MIN_NAME_LENGTH = 2;
  private static final int MAX_NAME_LENGTH = 30;
  private static final int MAX_EMAIL_LENGTH = 320;
  private static final int MIN_EMAIL_LOCAL_PART_LENGTH = 1;
  private static final int MAX_EMAIL_LOCAL_PART_LENGTH = 64;
  private static final int MAX_EMAIL_DOMAIN_PART_LENGTH = 253;
  private static final int STUDENT_ID_LENGTH = 8;
  private static final String EMAIL_AT_SYMBOL = "@";

  /**
   * 유효성 검증 진입점 접근 제한자 private-package 준수 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스 정제값 없는 경우, 별도
   */
  static void validate(String id, PersonalInfoQuestionType questionType, String value) {
    // 검증
    validateId(id);
    validateQuestionType(questionType);
    validateValueByQuestionType(questionType, value);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, PERSONAL_INFO_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, PERSONAL_INFO_INVALID_ID_FORMAT);
  }

  private static void validateQuestionType(PersonalInfoQuestionType questionType) {
    validateNotNull(questionType, PERSONAL_INFO_QUESTION_TYPE_NULL);
  }

  private static void validateValueByQuestionType(
      PersonalInfoQuestionType questionType, String value) {
    validateNotNullOrEmpty(value, PERSONAL_INFO_VALUE_NULL_OR_EMPTY);

    switch (questionType) {
      case STUDENT_ID -> validateStudentId(value);
      case PHONE_NUMBER -> validatePhoneNumber(value);
      case PROFILE_IMAGE -> validateImageUrl(value);
      case NAME -> validateName(value);
      case EMAIL -> validateEmail(value);
    }
  }

  private static void validateStudentId(String studentId) {
    validateExactLength(studentId, STUDENT_ID_LENGTH, PERSONAL_INFO_INVALID_STUDENT_ID_LENGTH);
    validatePattern(studentId, STUDENT_ID_PATTERN, PERSONAL_INFO_INVALID_STUDENT_ID_FORMAT);
  }

  private static void validatePhoneNumber(String phoneNumber) {
    validatePattern(phoneNumber, PHONE_NUMBER_PATTERN, PERSONAL_INFO_INVALID_PHONE_NUMBER_FORMAT);
  }

  // TODO: S3 구성이후 유효성 규칙 수정 필요
  private static void validateImageUrl(String metadataId) {
    validateNotNullOrEmpty(metadataId, PERSONAL_INFO_PROFILE_IMAGE_METADATA_ID_NULL_OR_EMPTY);
    validatePattern(
        metadataId, UUID_PATTERN, PERSONAL_INFO_INVALID_PROFILE_IMAGE_METADATA_ID_FORMAT);
  }

  private static void validateName(String name) {
    validateNotNullOrEmpty(name, PERSONAL_INFO_NAME_NULL_OR_EMPTY);
    validateLengthRange(name, MIN_NAME_LENGTH, MAX_NAME_LENGTH, PERSONAL_INFO_INVALID_NAME_LENGTH);
    validatePattern(name, NAME_PATTERN, PERSONAL_INFO_INVALID_NAME_FORMAT);
  }

  /** RFC 5322 준수 Email */
  private static void validateEmail(String email) {
    validateNotNullOrEmpty(email, PERSONAL_INFO_EMAIL_NULL_OR_EMPTY);
    validateMaxLength(email, MAX_EMAIL_LENGTH, PERSONAL_INFO_EMAIL_TOO_LONG);
    validateContains(email, EMAIL_AT_SYMBOL, PERSONAL_INFO_EMAIL_MISSING_AT_SYMBOL);

    int atIndex = email.indexOf(EMAIL_AT_SYMBOL);
    String localPart = email.substring(0, atIndex);
    String domainPart = email.substring(atIndex + 1);

    // 로컬파트 길이 검증
    validateLengthRange(
        localPart,
        MIN_EMAIL_LOCAL_PART_LENGTH,
        MAX_EMAIL_LOCAL_PART_LENGTH,
        PERSONAL_INFO_EMAIL_LOCAL_PART_INVALID_LENGTH);

    // 도메인부 길이 검증
    validateNotNullOrEmpty(domainPart, PERSONAL_INFO_EMAIL_DOMAIN_PART_NULL_OR_EMPTY);
    validateMaxLength(
        domainPart, MAX_EMAIL_DOMAIN_PART_LENGTH, PERSONAL_INFO_EMAIL_DOMAIN_PART_TOO_LONG);

    // RFC 5322 정규식 검증
    validatePattern(email, EMAIL_PATTERN, PERSONAL_INFO_INVALID_EMAIL_FORMAT);
  }
}
