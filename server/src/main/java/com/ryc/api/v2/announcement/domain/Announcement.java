package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Announcement {
  // Announcement 정보
  private final String id;
  private final String clubId;
  private final String title;
  private final String numberOfPeople;
  private final String detailDescription;
  private final String summaryDescription;
  private final String target;
  private final List<Tag> tags;
  private final List<Image> images;
  private final AnnouncementStatus announcementStatus;
  private final AnnouncementType announcementType;
  private final Boolean hasInterview;
  private final AnnouncementPeriodInfo announcementPeriodInfo;
  private final AnnouncementApplication announcementApplication;
  private final String activityPeriod;

  // soft delete
  private final Boolean isDeleted;

  // timestamp
  private final LocalDateTime createdAt;
  private final LocalDateTime updatedAt;

  /**
   * 최초 생성시에만 사용하는 정적 팩토리 메서드
   *
   * @param request create request
   * @return Announcement domain
   */
  public static Announcement initialize(AnnouncementCreateRequest request, String clubId) {

    // 1. 각 request mapping
    List<Tag> tags = request.tags().stream().map(Tag::from).toList();

    List<Image> images = request.images().stream().map(Image::from).toList();

    AnnouncementApplication announcementApplication =
        AnnouncementApplication.initialize(request.application());

    AnnouncementPeriodInfo announcementPeriodInfo =
        AnnouncementPeriodInfo.from(request.periodInfo());

    // 2. 현재 기간과 지원 기간을 비교하여 상태 반환
    AnnouncementStatus announcementStatus = AnnouncementStatus.from(announcementPeriodInfo);

    // 3. 기간 값이 올바르지 않은 경우(CLOSED) Exception 발생
    if (announcementStatus == AnnouncementStatus.CLOSED) {
      throw new IllegalArgumentException("announcement shouldn't have closed status");
    }

    // 4. announcement domain 생성
    return Announcement.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .clubId(clubId)
        .announcementPeriodInfo(announcementPeriodInfo)
        .title(request.title())
        .numberOfPeople(request.numberOfPeople())
        .detailDescription(request.detailDescription())
        .summaryDescription(request.summaryDescription())
        .target(request.target())
        .tags(tags)
        .hasInterview(request.hasInterview())
        .images(images)
        .announcementStatus(announcementStatus)
        .announcementType(request.announcementType())
        .announcementApplication(announcementApplication)
        .activityPeriod(request.activityPeriod())
        .isDeleted(false)
        .build();
  }

  /**
   * 업데이트시 사용될 정적팩토리 메소드
   *
   * @param request Update Request
   */
  public Announcement update(AnnouncementUpdateRequest request) {

    // 1. 각 request update
    List<Tag> updatedTags = request.tags().stream().map(Tag::from).toList();

    List<Image> updatedImages = request.images().stream().map(Image::from).toList();

    AnnouncementPeriodInfo updatedAnnouncementPeriodInfo =
        AnnouncementPeriodInfo.from(request.periodInfo());

    AnnouncementApplication updatedAnnouncementApplication =
        this.announcementApplication.update(request.application());

    // 2. 현재 기간과 지원 기간을 비교하여 상태 반환
    AnnouncementStatus updatedAnnouncementStatus =
        AnnouncementStatus.from(updatedAnnouncementPeriodInfo);

    return Announcement.builder()
        .id(this.id)
        .title(request.title())
        .clubId(request.clubRoleSecuredDto().clubId())
        .numberOfPeople(request.numberOfPeople())
        .detailDescription(request.detailDescription())
        .summaryDescription(request.summaryDescription())
        .target(request.target())
        .hasInterview(request.hasInterview())
        .activityPeriod(request.activityPeriod())
        .tags(updatedTags)
        .images(updatedImages)
        .announcementStatus(updatedAnnouncementStatus)
        .announcementType(request.announcementType())
        .announcementApplication(updatedAnnouncementApplication)
        .isDeleted(false)
        .announcementPeriodInfo(updatedAnnouncementPeriodInfo)
        .build();
  }

  /**
   * status 갱신 메소드
   *
   * @return
   */
  public Announcement updateStatus() {
    AnnouncementStatus updatedAnnouncementStatus =
        AnnouncementStatus.from(this.announcementPeriodInfo);

    return Announcement.builder()
        .id(this.id)
        .title(this.title)
        .clubId(this.clubId)
        .numberOfPeople(this.numberOfPeople)
        .detailDescription(this.detailDescription)
        .summaryDescription(this.summaryDescription)
        .target(this.target)
        .hasInterview(this.hasInterview)
        .activityPeriod(this.activityPeriod)
        .tags(this.tags)
        .images(this.images)
        .announcementStatus(updatedAnnouncementStatus)
        .announcementType(this.announcementType)
        .announcementApplication(this.announcementApplication)
        .isDeleted(false)
        .announcementPeriodInfo(this.announcementPeriodInfo)
        .build();
  }

  /**
   * 유효 객체 검사
   *
   * @throws IllegalArgumentException 각 객체가 유효하지 않을 경우
   */
  public void validate() {
    announcementPeriodInfo.validate(hasInterview);
    announcementApplication.validate();
  }
}
