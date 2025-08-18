package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Announcement {
  // Announcement 정보
  private final String id;
  private final String clubId;
  private final String title;
  private final String numberOfPeople;
  private final String detailDescription;
  private final String summaryDescription;
  private final String target;
  private final String field;
  private final List<Tag> tags;
  private final AnnouncementStatus announcementStatus;
  private final AnnouncementType announcementType;
  private final Boolean hasInterview;
  private final AnnouncementPeriodInfo announcementPeriodInfo;
  private final String activityPeriod;

  // application form
  private final ApplicationForm applicationForm;

  // soft delete
  private final Boolean isDeleted;

  // timestamp
  private final LocalDateTime createdAt;
  private final LocalDateTime updatedAt;

  @Builder
  private Announcement(
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

    // 1. 정제
    String sanitizeTitle = DataResolveUtil.sanitizeString(title);
    String sanitizeNumberOfPeople = DataResolveUtil.sanitizeString(numberOfPeople);
    String sanitizeDetailDescription = DataResolveUtil.sanitizeString(detailDescription);
    String sanitizeSummaryDescription = DataResolveUtil.sanitizeString(summaryDescription);
    String sanitizeTarget = DataResolveUtil.sanitizeString(target);
    String sanitizeField = DataResolveUtil.sanitizeString(field);
    String sanitizeActivityPeriod = DataResolveUtil.sanitizeString(activityPeriod);

    // 2. 선택 멤버 변수 기본값 처리
    List<Tag> resolvedTags = tags != null ? tags : new ArrayList<>();
    Boolean resolvedHasInterview = hasInterview != null ? hasInterview : Boolean.TRUE;
    Boolean resolvedIsDeleted = isDeleted != null ? isDeleted : Boolean.FALSE;

    // 3. 검증
    AnnouncementValidator.validate(
        id,
        clubId,
        sanitizeTitle,
        sanitizeNumberOfPeople,
        sanitizeDetailDescription,
        sanitizeSummaryDescription,
        sanitizeTarget,
        sanitizeField,
        resolvedTags,
        announcementStatus,
        announcementType,
        resolvedHasInterview,
        announcementPeriodInfo,
        sanitizeActivityPeriod,
        applicationForm,
        resolvedIsDeleted,
        createdAt,
        updatedAt);

    // 4. 할당
    this.id = id;
    this.clubId = clubId;
    this.title = sanitizeTitle;
    this.numberOfPeople = sanitizeNumberOfPeople;
    this.detailDescription = sanitizeDetailDescription;
    this.summaryDescription = sanitizeSummaryDescription;
    this.target = sanitizeTarget;
    this.field = sanitizeField;
    this.tags = resolvedTags;
    this.announcementStatus = announcementStatus;
    this.announcementType = announcementType;
    this.hasInterview = resolvedHasInterview;
    this.announcementPeriodInfo = announcementPeriodInfo;
    this.activityPeriod = sanitizeActivityPeriod;
    this.applicationForm = applicationForm;
    this.isDeleted = resolvedIsDeleted;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * 최초 생성시에만 사용하는 정적 팩토리 메서드
   *
   * @param request create request
   * @return Announcement domain
   */
  public static Announcement initialize(AnnouncementCreateRequest request, String clubId) {
    List<Tag> tags = request.tags().stream().map(Tag::from).toList();

    ApplicationForm applicationForm = ApplicationForm.initialize(request.applicationForm());

    AnnouncementPeriodInfo announcementPeriodInfo =
        AnnouncementPeriodInfo.from(request.periodInfo());

    AnnouncementType announcementType = AnnouncementType.from(request.announcementType());

    // 2. 현재 기간과 지원 기간을 비교하여 상태 반환
    AnnouncementStatus announcementStatus =
        AnnouncementStatus.from(announcementPeriodInfo, announcementType);

    // 4. Announcement 생성
    Announcement announcement =
        Announcement.builder()
            .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
            .clubId(clubId)
            .announcementPeriodInfo(announcementPeriodInfo)
            .title(request.title())
            .numberOfPeople(request.numberOfPeople())
            .detailDescription(request.detailDescription())
            .summaryDescription(request.summaryDescription())
            .target(request.target())
            .field(request.field())
            .tags(tags)
            // Client에서 필요가 없어져서 True로 삽입 추후 확장 가능성에 의해 필드값은 삭제 X
            .hasInterview(true)
            .announcementStatus(announcementStatus)
            .announcementType(announcementType)
            .applicationForm(applicationForm)
            .activityPeriod(request.activityPeriod())
            .isDeleted(false)
            .build();

    // 5. 유효성 검사
    announcement.validate();
    return announcement;
  }

  /**
   * update request to announcement domain
   *
   * @param request Update Request
   */
  public static Announcement of(
      AnnouncementUpdateRequest request, String announcementId, String clubId) {

    List<Tag> updatedTags = request.tags().stream().map(Tag::from).toList();

    ApplicationForm applicationForm = ApplicationForm.from(request.applicationForm());
    AnnouncementPeriodInfo updatedAnnouncementPeriodInfo =
        AnnouncementPeriodInfo.from(request.periodInfo());
    AnnouncementType announcementType = AnnouncementType.from(request.announcementType());

    AnnouncementStatus updatedAnnouncementStatus =
        AnnouncementStatus.from(updatedAnnouncementPeriodInfo, announcementType);

    // 3. announcement 생성
    Announcement announcement =
        Announcement.builder()
            .id(announcementId)
            .applicationForm(applicationForm)
            .title(request.title())
            .clubId(clubId)
            .numberOfPeople(request.numberOfPeople())
            .detailDescription(request.detailDescription())
            .summaryDescription(request.summaryDescription())
            .target(request.target())
            .field(request.field())
            .hasInterview(true)
            .activityPeriod(request.activityPeriod())
            .tags(updatedTags)
            .announcementStatus(updatedAnnouncementStatus)
            .announcementType(announcementType)
            .isDeleted(false)
            .announcementPeriodInfo(updatedAnnouncementPeriodInfo)
            .build();

    // 4. 유효성 검사
    announcement.validate();
    return announcement;
  }

  /** status 갱신 메소드 */
  public Announcement updateStatus() {
    AnnouncementStatus updatedAnnouncementStatus =
        AnnouncementStatus.from(this.announcementPeriodInfo, this.announcementType);

    return Announcement.builder()
        .id(this.id)
        .title(this.title)
        .clubId(this.clubId)
        .numberOfPeople(this.numberOfPeople)
        .detailDescription(this.detailDescription)
        .summaryDescription(this.summaryDescription)
        .target(this.target)
        .field(this.field)
        .hasInterview(true)
        .activityPeriod(this.activityPeriod)
        .tags(this.tags)
        .applicationForm(this.applicationForm)
        .announcementStatus(updatedAnnouncementStatus)
        .announcementType(this.announcementType)
        .isDeleted(false)
        .announcementPeriodInfo(this.announcementPeriodInfo)
        .build();
  }

  /**
   * 유효 객체 검사
   *
   * @throws BusinessRuleException 각 객체가 유효하지 않을 경우
   */
  public void validate() {
    // 생성시에는 모집 예정, 모집 중
    if (id.equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) {
      if (announcementStatus == AnnouncementStatus.CLOSED) {
        throw new BusinessRuleException(AnnouncementErrorCode.INVALID_ANNOUNCEMENT_STATUS);
      }
    }
    // 업데이트시 모집 예정일 때만 수정가능
    else {
      if (!(announcementStatus == AnnouncementStatus.UPCOMING)) {
        throw new BusinessRuleException(AnnouncementErrorCode.INVALID_ANNOUNCEMENT_STATUS);
      }
    }

    applicationForm.checkBusinessRules();
  }
}
