package com.ryc.api.v2.applicant.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ApplicantValidator extends DomainValidator {

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
  private static final int MAX_EMAIL_DOMAIN_PART_LENGTH = 253;
  private static final String EMAIL_AT_SYMBOL = "@";

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스 */
  static void validate(
      String id,
      String announcementId,
      String email,
      String name,
      ApplicantStatus status,
      List<ApplicantPersonalInfo> personalInfos) {

    validateId(id);
    validateAnnouncementId(announcementId);
    validateEmail(email);
    validateName(name);
    validateStatus(status);
    validatePersonalInfos(personalInfos);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, APPLICANT_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, APPLICANT_INVALID_ID_FORMAT);
  }

  private static void validateAnnouncementId(String announcementId) {
    validateNotNullOrEmpty(announcementId, APPLICANT_ANNOUNCEMENT_ID_NULL_OR_EMPTY);
    validatePattern(announcementId, UUID_PATTERN, APPLICANT_INVALID_ANNOUNCEMENT_ID_FORMAT);
  }

  /** RFC 5322 준수 Email */
  private static void validateEmail(String email) {
    validateNotNullOrEmpty(email, APPLICANT_EMAIL_NULL_OR_EMPTY);
    validateMaxLength(email, MAX_EMAIL_LENGTH, APPLICANT_EMAIL_TOO_LONG);
    validateContains(email, EMAIL_AT_SYMBOL, APPLICANT_EMAIL_MISSING_AT_SYMBOL);

    int atIndex = email.indexOf(EMAIL_AT_SYMBOL);
    String localPart = email.substring(0, atIndex);
    String domainPart = email.substring(atIndex + 1);

    // 로컬파트 길이 검증
    validateLengthRange(
        localPart,
        MIN_EMAIL_LOCAL_PART_LENGTH,
        MAX_EMAIL_LOCAL_PART_LENGTH,
        APPLICANT_EMAIL_LOCAL_PART_INVALID_LENGTH);

    // 도메인부 길이 검증 (RFC 5321: 도메인 최대 253자)
    validateNotNullOrEmpty(domainPart, APPLICANT_EMAIL_DOMAIN_PART_NULL_OR_EMPTY);
    validateMaxLength(
        domainPart, MAX_EMAIL_DOMAIN_PART_LENGTH, APPLICANT_EMAIL_DOMAIN_PART_TOO_LONG);

    // RFC 5322 정규식 검증
    validatePattern(email, EMAIL_PATTERN, APPLICANT_INVALID_EMAIL_FORMAT);
  }

  private static void validateName(String name) {
    validateNotNullOrEmpty(name, APPLICANT_NAME_NULL_OR_EMPTY);
    validateLengthRange(name, MIN_NAME_LENGTH, MAX_NAME_LENGTH, APPLICANT_INVALID_NAME_LENGTH);
    validatePattern(name, NAME_PATTERN, APPLICANT_INVALID_NAME_FORMAT);
  }

  private static void validateStatus(ApplicantStatus status) {
    validateNotNull(status, APPLICANT_STATUS_NULL);
  }

  private static void validatePersonalInfos(List<ApplicantPersonalInfo> personalInfos) {
    // 빈 리스트 허용
    validateNotNull(personalInfos, APPLICANT_PERSONAL_INFOS_NULL);
  }
}
