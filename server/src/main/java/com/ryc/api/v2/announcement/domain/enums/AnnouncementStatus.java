package com.ryc.api.v2.announcement.domain.enums;

import java.time.LocalDateTime;

import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;

public enum AnnouncementStatus {
  UPCOMING,
  RECRUITING,
  CLOSED;

  /**
   * 현재 시간과 지원 시간을 비교하여 status를 반환하는 메소드
   *
   * @param announcementPeriodInfo 공고 기간 정보
   * @return AnnouncementStatus
   */
  public static AnnouncementStatus from(AnnouncementPeriodInfo announcementPeriodInfo) {
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
