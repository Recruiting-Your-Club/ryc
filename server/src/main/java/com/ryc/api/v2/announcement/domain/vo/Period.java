package com.ryc.api.v2.announcement.domain.vo;

import java.time.LocalDateTime;

import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;

/**
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 * @brief 기간 정보 pojo
 */
@Builder
public record Period(LocalDateTime startDate, LocalDateTime endDate) {
  public static Period initialize(PeriodRequest periodRequest) {
    if (periodRequest == null) {
      return Period.builder()
          .startDate(DomainDefaultValues.DEFAULT_INITIAL_DATETIME)
          .endDate(DomainDefaultValues.DEFAULT_INITIAL_DATETIME)
          .build();
    }

    return Period.builder()
        .startDate(periodRequest.startDate())
        .endDate(periodRequest.endDate())
        .build();
  }

  /**
   * @return 둘의 기간이 겹치는지 여부
   */
  public Boolean isOverlapped(Period period) {
    return endDate.isAfter(period.startDate) || startDate.isAfter(period.startDate);
  }

  /**
   * @return 기간이 정상적인지 여부
   */
  public Boolean isValid() {
    return startDate.isBefore(endDate);
  }

  /**
   * @return 기간이 시작 날짜보다 전인지 여부
   */
  public Boolean isBefore(Period period) {
    return endDate.isBefore(period.startDate);
  }

  /**
   * @return 이미 지난 기간인지 여부
   */
  public Boolean isExpired() {
    return endDate.isBefore(LocalDateTime.now());
  }
}
