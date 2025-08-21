package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ClubValidator extends DomainValidator {

  private ClubValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  // 공통 상수
  private static final int MIN_NAME_LENGTH = 2;
  private static final int MAX_NAME_LENGTH = 50;
  private static final int MAX_SHORT_DESCRIPTION_LENGTH = 200;
  private static final int MAX_DETAIL_DESCRIPTION_LENGTH = 5000;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id,
      String name,
      String shortDescription,
      String detailDescription,
      Category category,
      List<ClubTag> clubTags,
      List<ClubSummary> clubSummaries) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateName(name);
    validateShortDescription(shortDescription);
    validateDetailDescription(detailDescription);
    validateCategory(category);
    validateClubTags(clubTags);
    validateClubSummaries(clubSummaries);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, CLUB_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, CLUB_INVALID_ID_FORMAT);
  }

  private static void validateName(String name) {
    validateNotNullOrEmpty(name, CLUB_NAME_NULL_OR_EMPTY);
    validateLengthRange(name, MIN_NAME_LENGTH, MAX_NAME_LENGTH, CLUB_INVALID_NAME_LENGTH);
  }

  private static void validateShortDescription(String shortDescription) {
    // NULL 허용
    if (shortDescription != null) {
      validateNotEmpty(shortDescription, CLUB_SHORT_DESCRIPTION_EMPTY);
      validateMaxLength(
          shortDescription, MAX_SHORT_DESCRIPTION_LENGTH, CLUB_SHORT_DESCRIPTION_TOO_LONG);
    }
  }

  private static void validateDetailDescription(String detailDescription) {
    // NULL 허용
    if (detailDescription != null) {
      validateNotEmpty(detailDescription, CLUB_DETAIL_DESCRIPTION_EMPTY);
      validateMaxLength(
          detailDescription, MAX_DETAIL_DESCRIPTION_LENGTH, CLUB_DETAIL_DESCRIPTION_TOO_LONG);
    }
  }

  private static void validateCategory(Category category) {
    validateNotNull(category, CLUB_CATEGORY_NULL);
  }

  private static void validateClubTags(List<ClubTag> clubTags) {
    validateNotNull(clubTags, CLUB_TAGS_NULL);
  }

  private static void validateClubSummaries(List<ClubSummary> clubSummaries) {
    validateNotNull(clubSummaries, CLUB_SUMMARIES_NULL);
  }
}
