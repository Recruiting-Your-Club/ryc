package com.ryc.api.v2.club.domain.enums;

/** 동아리 대분류 */
public enum Category {
  PERFORMANCE_ARTS("공연분과"),
  CULTURE("문화분과"),
  SPORTS("체육분과"),
  ACADEMIC("학술분과"),
  VOLUNTEER("봉사분과"),
  RELIGION("종교분과");

  private final String koreanName;

  Category(String koreanName) {
    this.koreanName = koreanName;
  }

  public String getKoreanName() {
    return koreanName;
  }
}
