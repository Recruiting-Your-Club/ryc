package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;

import lombok.AccessLevel;
import lombok.Builder;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class AnnouncementValidator {

  private AnnouncementValidator() {}

  /** 유효성 검증 규칙 (Validation Roles) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final int MIN_TITLE_LENGTH = 2;
  private static final int MAX_TITLE_LENGTH = 100;
  private static final int MAX_DESCRIPTION_LENGTH = 10000;
  private static final int MAX_SUMMARY_DESCRIPTION_LENGTH = 300;
  private static final int MAX_TARGET_LENGTH = 50;
  private static final int MAX_FIELD_LENGTH = 50;
  private static final int MAX_ACTIVITY_PERIOD_LENGTH = 100;
  private static final int MAX_NUMBER_OF_PEOPLE_LENGTH = 50;

  /**
   * 문자열 정제 메소드
   *
   * @param string
   * @return null Or Trimed String
   */
  private static String sanitizeString(String string) {
    return string != null ? string.trim() : null;
  }

  /** 유효성 검증 진입점 접근 제한자 private-package 준수
   * 데이터 정제 -> Default 값 대입 -> 유효성 검증 순서의 프로세스
   */
  static ValidatedAnnouncement validateAndSanitize(
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
    
    // 정제
    String resolvedTitle = sanitizeString(title);
    String resolvedNumberOfPeople = sanitizeString(numberOfPeople);
    String resolvedDetailDescription = sanitizeString(detailDescription);
    String resolvedSummaryDescription = sanitizeString(summaryDescription);
    String resolvedTarget = sanitizeString(target);
    String resolvedField = sanitizeString(field);
    String resolvedActivityPeriod = sanitizeString(activityPeriod);

    // 선택 멤버 변수 기본값 처리
    Boolean resolvedHasInterview = hasInterview != null ? hasInterview : Boolean.TRUE;
    Boolean resolvedIsDeleted = isDeleted != null ? isDeleted : Boolean.FALSE;
    // TODO: 현재 해당 도메인만 어플리케이션 단에서 도메인 생성시점으로 지정. 현재 다른 도메인은 DB에 위임. 수정 필요
    LocalDateTime resolvedCreatedAt = createdAt != null ? createdAt : LocalDateTime.now();
    LocalDateTime resolvedUpdatedAt = updatedAt != null ? updatedAt : LocalDateTime.now();

    // 검증
    validateId(id);
    validateClubId(clubId);
    validateTitle(resolvedTitle);
    validateNumberOfPeople(resolvedNumberOfPeople);
    validateDetailDescription(resolvedDetailDescription);
    validateSummaryDescription(resolvedSummaryDescription);
    validateTarget(resolvedTarget);
    validateField(resolvedField);
    validateTags(tags);
    validateAnnouncementStatus(announcementStatus);
    validateAnnouncementType(announcementType);
    validateHasInterview(resolvedHasInterview);
    validateAnnouncementPeriodInfo(announcementPeriodInfo);
    validateActivityPeriod(resolvedActivityPeriod);
    validateApplicationForm(applicationForm);
    validateIsDeleted(resolvedIsDeleted);
    validateCreatedAt(resolvedCreatedAt);
    validateUpdatedAt(resolvedUpdatedAt);

    return ValidatedAnnouncement.builder()
        .id(id)
        .clubId(clubId)
        .title(resolvedTitle)
        .numberOfPeople(resolvedNumberOfPeople)
        .detailDescription(resolvedDetailDescription)
        .summaryDescription(resolvedSummaryDescription)
        .target(resolvedTarget)
        .field(resolvedField)
        .tags(tags)
        .announcementStatus(announcementStatus)
        .announcementType(announcementType)
        .hasInterview(resolvedHasInterview)
        .announcementPeriodInfo(announcementPeriodInfo)
        .activityPeriod(resolvedActivityPeriod)
        .applicationForm(applicationForm)
        .isDeleted(resolvedIsDeleted)
        .createdAt(createdAt)
        .updatedAt(updatedAt)
        .build();
  }

  /**
   * 검증 private 헬퍼 메소드
   */

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

  private static void validateClubId(String clubId) {
    if (clubId == null || clubId.isEmpty()) {
      throw new IllegalArgumentException("ClubId cannot be null or empty");
    }

    if (!UUID_PATTERN.matcher(clubId).matches()) {
      throw new IllegalArgumentException(
          "ClubId must be a valid UUID format (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)");
    }
  }

  private static void validateTitle(String title) {
    if (title == null || title.isEmpty()) {
      throw new IllegalArgumentException("Announcement Title cannot be null or empty");
    }

    if (title.length() < MIN_TITLE_LENGTH) {
      throw new IllegalArgumentException(
          "Announcement Title must be at least " + MIN_TITLE_LENGTH + " characters");
    }
    if (title.length() > MAX_TITLE_LENGTH) {
      throw new IllegalArgumentException("Announcement Title cannot exceed " + MAX_TITLE_LENGTH + " characters");
    }
  }

  private static void validateNumberOfPeople(String numberOfPeople) {
    if (numberOfPeople == null || numberOfPeople.isEmpty()) {
      throw new IllegalArgumentException("NumberOfPeople cannot be null or empty");
    }

    if (numberOfPeople.length() > MAX_NUMBER_OF_PEOPLE_LENGTH) {
      throw new IllegalArgumentException("NumberOfPeople cannot exceed " + MAX_NUMBER_OF_PEOPLE_LENGTH + " characters");
    }
  }

  private static void validateDetailDescription(String detailDescription) {
    if (detailDescription == null || detailDescription.isEmpty()) {
      throw new IllegalArgumentException("DetailDescription cannot be null or empty");
    }

    if (detailDescription.length() > MAX_DESCRIPTION_LENGTH) {
      throw new IllegalArgumentException("DetailDescription cannot exceed " + MAX_DESCRIPTION_LENGTH + " characters");
    }
  }

  private static void validateSummaryDescription(String summaryDescription) {
    if (summaryDescription == null || summaryDescription.isEmpty()) {
      throw new IllegalArgumentException("SummaryDescription cannot be null or empty");
    }

    if (summaryDescription.length() > MAX_SUMMARY_DESCRIPTION_LENGTH) {
      throw new IllegalArgumentException("SummaryDescription cannot exceed " + MAX_SUMMARY_DESCRIPTION_LENGTH + " characters");
    }
  }

  private static void validateTarget(String target) {
    if (target == null || target.isEmpty()) {
      throw new IllegalArgumentException("Target cannot be null or empty");
    }

    if (target.length() > MAX_TARGET_LENGTH) {
      throw new IllegalArgumentException("Target cannot exceed " + MAX_TARGET_LENGTH + " characters");
    }
  }

  private static void validateField(String field) {
    if (field == null || field.isEmpty()) {
      throw new IllegalArgumentException("Field cannot be null or empty");
    }

    if (field.length() > MAX_FIELD_LENGTH) {
      throw new IllegalArgumentException("Field cannot exceed " + MAX_FIELD_LENGTH + " characters");
    }
  }

  private static void validateActivityPeriod(String activityPeriod) {
    if (activityPeriod == null || activityPeriod.isEmpty()) {
      throw new IllegalArgumentException("ActivityPeriod cannot be null or empty");
    }

    if (activityPeriod.length() > MAX_ACTIVITY_PERIOD_LENGTH) {
      throw new IllegalArgumentException("ActivityPeriod cannot exceed " + MAX_ACTIVITY_PERIOD_LENGTH + " characters");
    }
  }

  private static void validateTags(List<Tag> tags) {
    if (tags == null) {
      throw new IllegalArgumentException("Tags cannot be null");
    }
  }

  private static void validateAnnouncementStatus(AnnouncementStatus announcementStatus) {
    if (announcementStatus == null) {
      throw new IllegalArgumentException("AnnouncementStatus cannot be null");
    }
  }

  private static void validateAnnouncementType(AnnouncementType announcementType) {
    if (announcementType == null) {
      throw new IllegalArgumentException("AnnouncementType cannot be null");
    }
  }

  private static void validateHasInterview(Boolean hasInterview) {
    if (hasInterview == null) {
      throw new IllegalArgumentException("HasInterview cannot be null");
    }
  }

  private static void validateAnnouncementPeriodInfo(AnnouncementPeriodInfo announcementPeriodInfo) {
    if (announcementPeriodInfo == null) {
      throw new IllegalArgumentException("AnnouncementPeriodInfo cannot be null");
    }
  }

  private static void validateApplicationForm(ApplicationForm applicationForm) {
    if (applicationForm == null) {
      throw new IllegalArgumentException("ApplicationForm cannot be null");
    }
  }

  private static void validateIsDeleted(Boolean isDeleted) {
    if (isDeleted == null) {
      throw new IllegalArgumentException("IsDeleted cannot be null");
    }
  }

  //TODO: createdAt, updatedAt Null 비허용 로직 추가
  private static void validateCreatedAt(LocalDateTime createdAt) {
    if (createdAt == null) {
      throw new IllegalArgumentException("createdAt cannot be null");
    }
  }

  private static void validateUpdatedAt(LocalDateTime updatedAt) {
    if (updatedAt == null) {
      throw new IllegalArgumentException("updatedAt cannot be null");
    }
  }

  /** 접근 제한자 package-private 준수 */
  @Builder(access = AccessLevel.PRIVATE)
  record ValidatedAnnouncement(
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
      LocalDateTime updatedAt) {}
}