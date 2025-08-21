package com.ryc.api.v2.announcement.domain.enums;

import java.time.LocalDateTime;

import com.ryc.api.v2.announcement.domain.vo.Period;

public enum AnnouncementStatus {
  UPCOMING,
  RECRUITING,
  CLOSED,
  EMPTY;

  /**
   * 현재 시간과 지원 시간을 비교하여 status를 반환하는 메소드
   *
   * @param applicationPeriod 지원 기간 정보
   * @return AnnouncementStatus
   */
  // TODO: 서비스에서 announcementPeriodInfo, type null 아닌상태로 들어오는거 보장하듯이 코드 짜야함. 근데 지금 이게 init에서 호출되어서
  // 이 검증책임이 Announcement한테 달림. 서비스로 빼야함
  public static AnnouncementStatus from(Period applicationPeriod, AnnouncementType type) {
    LocalDateTime now = LocalDateTime.now();
    LocalDateTime startDate = applicationPeriod.startDate();
    LocalDateTime endDate = applicationPeriod.endDate();

    if (type == AnnouncementType.ALWAYS_OPEN) {
      return AnnouncementStatus.RECRUITING;
    } else if (now.isBefore(startDate)) {
      return AnnouncementStatus.UPCOMING;
    } else if (now.isBefore(endDate)) {
      return AnnouncementStatus.RECRUITING;
    } else {
      return AnnouncementStatus.CLOSED;
    }
  }
}
