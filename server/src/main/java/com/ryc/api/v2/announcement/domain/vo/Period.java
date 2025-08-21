package com.ryc.api.v2.announcement.domain.vo;

import java.time.LocalDateTime;

import com.ryc.api.v2.announcement.presentation.dto.request.PeriodRequest;

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
    PeriodValidator.validate(startDate, endDate);
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

  public Boolean isOverlap(Period other) {
    return (startDate.isBefore(other.startDate) && endDate.isAfter(other.endDate))
        || (startDate.isBefore(other.startDate) && endDate.isBefore(other.endDate))
        || (startDate.isAfter(other.startDate) && endDate.isAfter(other.endDate));
  }

  /** 파라미터의 Period보다 이전 Period인지 여부 */
  public Boolean isBefore(Period other) {
    return endDate.isBefore(other.startDate);
  }
}
