package com.ryc.api.v2.announcement.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementCreateRequest;
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
   * @param request create request
   * @return Announcement domain
   * @brief 최초 생성시에만 사용하는 정적 팩토리 메서드
   */
  public static Announcement initialize(AnnouncementCreateRequest request, String clubId) {

    // 1. 각 request mapping
    List<Tag> tags = request.tags().stream().map(Tag::initialize).toList();

    List<Image> images = request.images().stream().map(Image::initialize).toList();

    AnnouncementApplication announcementApplication =
        AnnouncementApplication.initialize(request.application());

    AnnouncementPeriodInfo announcementPeriodInfo =
        AnnouncementPeriodInfo.initialize(request.periodInfo());

    // 2. 현재 기간과 지원 기간을 비교하여 상태 반환
    AnnouncementStatus announcementStatus = getAnnouncementStatus(announcementPeriodInfo);

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
   * 유효 객체 검사
   *
   * @throws IllegalArgumentException 각 객체가 유효하지 않을 경우
   */
  public void validate() {
    announcementPeriodInfo.validate(hasInterview);
    announcementApplication.validate();
  }

  /**
   * 현재 시간과 지원 시간을 비교하여 status를 반환하는 메소드
   *
   * @param announcementPeriodInfo 공고 기간 정보
   * @return AnnouncementStatus
   */
  public static AnnouncementStatus getAnnouncementStatus(
      AnnouncementPeriodInfo announcementPeriodInfo) {
    LocalDateTime now = LocalDateTime.now();
    if (now.isBefore(announcementPeriodInfo.applicationPeriod().startDate())) {
      return AnnouncementStatus.UPCOMING;
    } else if (now.isBefore(announcementPeriodInfo.applicationPeriod().endDate())) {
      return AnnouncementStatus.RECRUITING;
    } else {
      return AnnouncementStatus.CLOSED;
    }
  }
}
