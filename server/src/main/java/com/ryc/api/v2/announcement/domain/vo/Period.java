package com.ryc.api.v2.announcement.domain.vo;

import java.time.LocalDateTime;

import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;

/**
 * 기간정보 pojo객체
 *
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
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
   * 기간 validate
   *
   * @throws IllegalArgumentException 시작날짜보다 끝 날짜가 빠른 경우
   */
  public void validate() {
    if (startDate.isAfter(endDate)) {
      throw new IllegalArgumentException("startDate should be before endDate");
    }
  }

  /** 파라미터의 Period보다 이전 Period인지 여부 */
  public Boolean isBefore(Period other) {
    return endDate.isBefore(other.startDate);
  }
}
