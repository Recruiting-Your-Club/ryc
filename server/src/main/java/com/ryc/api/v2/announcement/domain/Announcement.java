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

  private final Boolean isDeleted;

  /**
   * @param request create request
   * @return Announcement domain
   * @brief 최초 생성시에만 사용하는 정적 팩토리 메서드
   */
  public static Announcement initialize(AnnouncementCreateRequest request) {

    List<Tag> tags = request.tags().stream().map(Tag::initialize).toList();

    List<Image> images = request.images().stream().map(Image::initialize).toList();

    AnnouncementApplication announcementApplication =
        AnnouncementApplication.initialize(request.application());

    AnnouncementPeriodInfo announcementPeriodInfo =
        AnnouncementPeriodInfo.initialize(request.periodInfo());

    // 현재 시간과 지원 기간을 비교하여 상태 결정
    AnnouncementStatus announcementStatus = getAnnouncementStatus(announcementPeriodInfo);

    if (announcementStatus == AnnouncementStatus.CLOSED) {
      throw new IllegalArgumentException("announcement shouldn't have closed status");
    }

    return Announcement.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .clubId(request.clubId())
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
   * @brief 유효 객체 검사
   */
  public boolean isValid() {
    return announcementPeriodInfo.isValid(hasInterview) && announcementApplication.isValid();
  }

  /**
   * @param announcementPeriodInfo
   * @brief 현재 시간과 지원 시간을 비교하여 status를 반환하는 메소드
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
