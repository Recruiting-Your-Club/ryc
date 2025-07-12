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
@Builder
public record Period(LocalDateTime startDate, LocalDateTime endDate) {
  public static Period from(PeriodRequest periodRequest) {
    // 1. null 체크
    if (periodRequest == null) return null;

    // 2. Period로 변환
    Period period =
        Period.builder()
            .startDate(periodRequest.startDate())
            .endDate(periodRequest.endDate())
            .build();

    // 3. validate
    period.validate();
    return period;
  }

  /**
   * 기간 validate
   *
   * @throws IllegalArgumentException 시작날짜보다 끝 날짜가 빠른 경우
   */
  private void validate() {
    if (startDate.isAfter(endDate)) {
      throw new IllegalArgumentException("startDate should be before endDate");
    }
  }

  /** 파라미터의 Period보다 이전 Period인지 여부 */
  public Boolean isBefore(Period other) {
    return endDate.isBefore(other.startDate);
  }
}
