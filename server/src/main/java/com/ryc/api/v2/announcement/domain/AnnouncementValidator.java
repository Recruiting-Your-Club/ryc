package com.ryc.api.v2.announcement.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.common.domain.Tag;
import com.ryc.api.v2.common.validator.DomainValidator;

/** Announcement 도메인 전용 Validator */
final class AnnouncementValidator extends DomainValidator {

  private AnnouncementValidator() {}

  /** 공통 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  // 공통 상수
  private static final int MIN_TITLE_LENGTH = 2;
  private static final int MAX_TITLE_LENGTH = 200;
  private static final int MAX_DESCRIPTION_LENGTH = 20000;
  private static final int MAX_SUMMARY_DESCRIPTION_LENGTH = 300;
  private static final int MAX_TARGET_LENGTH = 50;
  private static final int MAX_FIELD_LENGTH = 50;
  private static final int MAX_ACTIVITY_PERIOD_LENGTH = 100;
  private static final int MAX_NUMBER_OF_PEOPLE_LENGTH = 50;

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id,
      String clubId,
      String title,
      String numberOfPeople,
      String detailDescription,
      String summaryDescription,
      String target,
      String field,
      List<Tag> tags,
      AnnouncementStatus announcementStatus,
      AnnouncementType announcementType,
      Boolean hasInterview,
      AnnouncementPeriodInfo announcementPeriodInfo,
      String activityPeriod,
      ApplicationForm applicationForm,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateClubId(clubId);
    validateTitle(title);
    validateNumberOfPeople(numberOfPeople);
    validateDetailDescription(detailDescription);
    validateSummaryDescription(summaryDescription);
    validateTarget(target);
    validateField(field);
    validateTags(tags);
    validateAnnouncementStatus(announcementStatus);
    validateAnnouncementType(announcementType);
    validateHasInterview(hasInterview);
    validateAnnouncementPeriodInfo(announcementPeriodInfo);
    validateActivityPeriod(activityPeriod);
    validateApplicationForm(applicationForm);
    validateCreatedAt(id, createdAt);
    validateUpdatedAt(id, updatedAt);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, ANNOUNCEMENT_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, ANNOUNCEMENT_INVALID_ID_FORMAT);
  }

  private static void validateClubId(String clubId) {
    validateNotNullOrEmpty(clubId, ANNOUNCEMENT_CLUB_ID_NULL_OR_EMPTY);
    validatePattern(clubId, UUID_PATTERN, ANNOUNCEMENT_INVALID_CLUB_ID_FORMAT);
  }

  private static void validateTitle(String title) {
    validateNotNullOrEmpty(title, ANNOUNCEMENT_TITLE_NULL_OR_EMPTY);
    validateLengthRange(
        title, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, ANNOUNCEMENT_INVALID_TITLE_LENGTH);
  }

  private static void validateNumberOfPeople(String numberOfPeople) {
    // NULL 허용
    if (numberOfPeople != null) {
      validateNotEmpty(numberOfPeople, ANNOUNCEMENT_NUMBER_OF_PEOPLE_EMPTY);
      validateMaxLength(
          numberOfPeople, MAX_NUMBER_OF_PEOPLE_LENGTH, ANNOUNCEMENT_NUMBER_OF_PEOPLE_TOO_LONG);
    }
  }

  private static void validateDetailDescription(String detailDescription) {
    // NULL 허용
    if (detailDescription != null) {
      validateNotEmpty(detailDescription, ANNOUNCEMENT_DETAIL_DESCRIPTION_EMPTY);
      validateMaxLength(
          detailDescription, MAX_DESCRIPTION_LENGTH, ANNOUNCEMENT_DETAIL_DESCRIPTION_TOO_LONG);
    }
  }

  private static void validateSummaryDescription(String summaryDescription) {
    // NULL 허용
    if (summaryDescription != null) {
      validateNotEmpty(summaryDescription, ANNOUNCEMENT_SUMMARY_DESCRIPTION_EMPTY);
      validateMaxLength(
          summaryDescription,
          MAX_SUMMARY_DESCRIPTION_LENGTH,
          ANNOUNCEMENT_SUMMARY_DESCRIPTION_TOO_LONG);
    }
  }

  private static void validateTarget(String target) {
    // NULL 허용
    if (target != null) {
      validateNotEmpty(target, ANNOUNCEMENT_TARGET_EMPTY);
      validateMaxLength(target, MAX_TARGET_LENGTH, ANNOUNCEMENT_TARGET_TOO_LONG);
    }
  }

  private static void validateField(String field) {
    // NULL 허용
    if (field != null) {
      validateNotEmpty(field, ANNOUNCEMENT_FIELD_EMPTY);
      validateMaxLength(field, MAX_FIELD_LENGTH, ANNOUNCEMENT_FIELD_TOO_LONG);
    }
  }

  private static void validateActivityPeriod(String activityPeriod) {
    // NULL 허용
    if (activityPeriod != null) {
      validateNotEmpty(activityPeriod, ANNOUNCEMENT_ACTIVITY_PERIOD_EMPTY);
      validateMaxLength(
          activityPeriod, MAX_ACTIVITY_PERIOD_LENGTH, ANNOUNCEMENT_ACTIVITY_PERIOD_TOO_LONG);
    }
  }

  private static void validateTags(List<Tag> tags) {
    // 빈 리스트 허용
    validateNotNull(tags, ANNOUNCEMENT_TAGS_NULL);
  }

  private static void validateAnnouncementStatus(AnnouncementStatus announcementStatus) {
    validateNotNull(announcementStatus, ANNOUNCEMENT_STATUS_NULL);
  }

  private static void validateAnnouncementType(AnnouncementType announcementType) {
    validateNotNull(announcementType, ANNOUNCEMENT_TYPE_NULL);
  }

  private static void validateHasInterview(Boolean hasInterview) {
    validateNotNull(hasInterview, ANNOUNCEMENT_HAS_INTERVIEW_NULL);
  }

  private static void validateAnnouncementPeriodInfo(
      AnnouncementPeriodInfo announcementPeriodInfo) {
    validateNotNull(announcementPeriodInfo, ANNOUNCEMENT_PERIOD_INFO_NULL);
  }

  private static void validateApplicationForm(ApplicationForm applicationForm) {
    validateNotNull(applicationForm, ANNOUNCEMENT_APPLICATION_FORM_NULL);
  }

  // 영속성 레이어를 거친 경우에만 service에서 상태검증으로 null 제한 체크
  private static void validateCreatedAt(String id, LocalDateTime createdAt) {}

  // 영속성 레이어를 거친 경우에만 service에서 상태검증으로 null 제한 체크
  private static void validateUpdatedAt(String id, LocalDateTime updatedAt) {}
}
