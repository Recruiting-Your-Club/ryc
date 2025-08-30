package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.domain.Tag;
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
      AnnouncementType announcementType,
      Boolean hasInterview,
      AnnouncementPeriodInfo announcementPeriodInfo,
      ApplicationForm applicationForm,
      String activityPeriod,
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
    List<Tag> resolvedTags = tags != null ? tags : List.of();
    Boolean resolvedHasInterview = hasInterview != null ? hasInterview : Boolean.TRUE;
    AnnouncementStatus status =
        AnnouncementStatus.from(announcementPeriodInfo.applicationPeriod(), announcementType);

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
        status,
        announcementType,
        resolvedHasInterview,
        announcementPeriodInfo,
        sanitizeActivityPeriod,
        applicationForm,
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
    this.announcementStatus = status;
    this.announcementType = announcementType;
    this.hasInterview = resolvedHasInterview;
    this.announcementPeriodInfo = announcementPeriodInfo;
    this.applicationForm = applicationForm;
    this.activityPeriod = sanitizeActivityPeriod;
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

    // Announcement 생성
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
            .announcementType(announcementType)
            .applicationForm(applicationForm)
            .activityPeriod(request.activityPeriod())
            .build();

    // 유효성 검사
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
            .announcementType(announcementType)
            .announcementPeriodInfo(updatedAnnouncementPeriodInfo)
            .build();

    // 4. 유효성 검사
    announcement.validate();
    return announcement;
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
        // TODO: 에러 메시지 및 코드 적절하지 않음. 수정 필요
        throw new BusinessRuleException(AnnouncementErrorCode.INVALID_ANNOUNCEMENT_STATUS);
      }
    }
    // 업데이트시 모집 예정일 때만 수정가능
    // 25.08.29(조상준) 중요: 아래 코드 비활성화 -> 업데이트시 기존공고객체, 수정된 공고객체 모두 아래 else문을 통과하기에,
    // 수정된 공고의 상태가 UPCOMING가 이닌, 모집중, 마김인 경우 아래 else문에서 에러 발생.
    // 따라서, 기존공고의 상태가 UPCOMING인지는 공고 수정 서비스에서 상태검증으로 작성.
    else {
      //      if (!(announcementStatus == AnnouncementStatus.UPCOMING)) {
      //        throw new BusinessRuleException(AnnouncementErrorCode.INVALID_ANNOUNCEMENT_STATUS);
      //      }
    }

    applicationForm.checkBusinessRules();
  }
}
