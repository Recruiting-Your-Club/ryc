package com.ryc.api.v2.announcement.domain.enums;

import java.time.LocalDateTime;

import com.ryc.api.v2.announcement.domain.vo.Period;

public enum AnnouncementStatus {
  UPCOMING,
  RECRUITING,
  CLOSED,
  EMPTY;

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
