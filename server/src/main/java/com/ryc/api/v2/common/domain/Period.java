package com.ryc.api.v2.common.domain;

import java.time.LocalDateTime;

import com.ryc.api.v2.common.dto.request.PeriodRequest;

import lombok.Builder;

/**
 * 기간정보 pojo객체
 *
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 */
public record Period(LocalDateTime startDate, LocalDateTime endDate) {

  @Builder
  public Period {
    LocalDateTime normalizedStartDate =
        startDate() != null ? startDate().toLocalDate().atStartOfDay() : null;
    LocalDateTime normalizedEndDate =
        endDate() != null ? endDate().toLocalDate().atTime(23, 59, 59) : null;

    PeriodValidator.validate(normalizedStartDate, normalizedEndDate);
  }

  public static Period from(PeriodRequest periodRequest) {
    // 1. null 체크
    if (periodRequest == null) return null;

    // 2. Period로 변환
    return Period.builder()
        .startDate(periodRequest.startDate())
        .endDate(periodRequest.endDate())
        .build();
  }
}
