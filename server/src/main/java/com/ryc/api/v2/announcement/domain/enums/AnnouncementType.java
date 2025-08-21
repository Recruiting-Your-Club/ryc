package com.ryc.api.v2.announcement.domain.enums;

public enum AnnouncementType {
  ALWAYS_OPEN,
  LIMITED_TIME;

  public static AnnouncementType from(String type) {
    return switch (type) {
      case "ALWAYS_OPEN" -> ALWAYS_OPEN;
      case "LIMITED_TIME" -> LIMITED_TIME;
      default -> throw new IllegalArgumentException("유효하지 않은 AnnouncementType: " + type);
    };
  }
}
