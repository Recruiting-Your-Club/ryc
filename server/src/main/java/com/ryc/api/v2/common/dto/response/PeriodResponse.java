package com.ryc.api.v2.common.dto.response;

import java.time.LocalDateTime;

import com.ryc.api.v2.common.domain.Period;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param startDate 시작 날짜
 * @param endDate 끝 날짜
 * @breif 기간 정보 Response Dto
 */
@Builder
public record PeriodResponse(
    @Schema(description = "시작 일시", example = "2025-06-01T09:00", type = "string")
        LocalDateTime startDate,
    @Schema(description = "종료 일시", example = "2025-06-30T18:00", type = "string")
        LocalDateTime endDate) {
  /** 정적 팩토리 메소드 */
  public static PeriodResponse from(Period period) {
    if (period == null) {
      return null;
    }

    return PeriodResponse.builder().startDate(period.startDate()).endDate(period.endDate()).build();
  }
}
