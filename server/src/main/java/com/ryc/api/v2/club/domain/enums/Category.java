package com.ryc.api.v2.club.domain.enums;

import com.ryc.api.v2.common.exception.code.ClubErrorCode;
import com.ryc.api.v2.common.exception.custom.ClubException;

import lombok.Getter;

/** 동아리 대분류 */
@Getter
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

  public static Category from(String category) {
    for (Category c : Category.values()) {
      // 대소문자 구분 없이 비교
      if (c.toString().equalsIgnoreCase(category)) {
        return c;
      }
    }
    throw new ClubException(ClubErrorCode.CLUB_CATEGORY_BAD_REQUEST);
  }
}
