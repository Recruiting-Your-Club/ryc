package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
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
  private static final int MAX_TITLE_LENGTH = 100;
  private static final int MAX_DESCRIPTION_LENGTH = 10000;
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
      Boolean isDeleted,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {

    // 공통 검증 메소드 사용
    validateId(id, "Announcement Id");
    validateClubId(clubId, "Club Id");
    validateTitle(title, "Announcement Title");
    validateNumberOfPeople(numberOfPeople, "NumberOfPeople");
    validateDetailDescription(detailDescription, "Detail Description");
    validateSummaryDescription(summaryDescription, "Summary Description");
    validateTarget(target, "Target");
    validateField(field, "Field");
    validateTags(tags, "Tags");
    validateAnnouncementStatus(announcementStatus, "Announcement Status");
    validateAnnouncementType(announcementType, "Announcement Type");
    validateHasInterview(hasInterview, "HasInterview");
    validateAnnouncementPeriodInfo(announcementPeriodInfo, "Announcement Period Info");
    validateActivityPeriod(activityPeriod, "Activity Period");
    validateApplicationForm(applicationForm, "Application Form");
    validateIsDeleted(isDeleted, "IsDeleted");
    validateCreatedAt(id, createdAt, "CreatedAt");
    validateUpdatedAt(id, updatedAt, "UpdatedAt");
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id, String fieldName) {
    validateNotNullOrEmpty(id, fieldName);
    validatePattern(id, fieldName, UUID_PATTERN, "(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
  }

  private static void validateClubId(String clubId, String fieldName) {
    validateNotNullOrEmpty(clubId, fieldName);
    validatePattern(clubId, fieldName, UUID_PATTERN, "(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
  }

  private static void validateTitle(String title, String fieldName) {
    validateNotNullOrEmpty(title, fieldName);
    validateLengthRange(title, fieldName, MIN_TITLE_LENGTH, MAX_TITLE_LENGTH);
  }

  private static void validateNumberOfPeople(String numberOfPeople, String fieldName) {
    // NULL 허용
    validateNotEmpty(numberOfPeople, fieldName);
    validateMaxLength(numberOfPeople, fieldName, MAX_NUMBER_OF_PEOPLE_LENGTH);
  }

  private static void validateDetailDescription(String detailDescription, String fieldName) {
    // NULL 허용
    validateNotEmpty(detailDescription, fieldName);
    validateMaxLength(detailDescription, fieldName, MAX_DESCRIPTION_LENGTH);
  }

  private static void validateSummaryDescription(String summaryDescription, String fieldName) {
    // NULL 허용
    validateNotEmpty(summaryDescription, fieldName);
    validateMaxLength(summaryDescription, fieldName, MAX_SUMMARY_DESCRIPTION_LENGTH);
  }

  private static void validateTarget(String target, String fieldName) {
    // NULL 허용
    validateNotEmpty(target, fieldName);
    validateMaxLength(target, fieldName, MAX_TARGET_LENGTH);
  }

  private static void validateField(String field, String fieldName) {
    // NULL 허용
    validateNotEmpty(field, fieldName);
    validateMaxLength(field, fieldName, MAX_FIELD_LENGTH);
  }

  private static void validateActivityPeriod(String activityPeriod, String fieldName) {
    // NULL 허용
    validateNotNullOrEmpty(activityPeriod, fieldName);
    validateMaxLength(activityPeriod, fieldName, MAX_ACTIVITY_PERIOD_LENGTH);
  }

  private static void validateTags(List<Tag> tags, String fieldName) {
    // 빈 리스트 허용
    validateNotNull(tags, fieldName);
  }

  private static void validateAnnouncementStatus(
      AnnouncementStatus announcementStatus, String fieldName) {
    validateNotNull(announcementStatus, fieldName);
  }

  private static void validateAnnouncementType(
      AnnouncementType announcementType, String fieldName) {
    validateNotNull(announcementType, fieldName);
  }

  private static void validateHasInterview(Boolean hasInterview, String fieldName) {
    validateNotNull(hasInterview, fieldName);
  }

  private static void validateAnnouncementPeriodInfo(
      AnnouncementPeriodInfo announcementPeriodInfo, String fieldName) {
    validateNotNull(announcementPeriodInfo, fieldName);
  }

  private static void validateApplicationForm(ApplicationForm applicationForm, String fieldName) {
    validateNotNull(applicationForm, fieldName);
  }

  private static void validateIsDeleted(Boolean isDeleted, String fieldName) {
    validateNotNull(isDeleted, fieldName);
  }

  private static void validateCreatedAt(String id, LocalDateTime createdAt, String fieldName) {
    // 영속화 이전 NULL 허용
    if (id.equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) return;
    validateNotNull(createdAt, fieldName);
  }

  private static void validateUpdatedAt(String id, LocalDateTime updatedAt, String fieldName) {
    // 영속화 이전 NULL 허용
    if (id.equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) return;
    validateNotNull(updatedAt, fieldName);
  }
}
