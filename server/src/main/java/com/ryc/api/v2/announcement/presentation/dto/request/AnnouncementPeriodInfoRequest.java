package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param applicationPeriod 지원 기간
 * @param interviewPeriod 면접 기간
 * @param documentResultPeriod 지원서 결과 기간
 * @param finalResultPeriod 최종 발표 기간
 * @brief 공고 기간 정보 Request Dto
 */
@Builder
public record AnnouncementPeriodInfoRequest(
    @NotNull(message = "applicationPeriod shouldn't be null") @Schema(description = "모집 기간")
        PeriodRequest applicationPeriod,
    @Schema(description = "면접 기간") PeriodRequest interviewPeriod,
    @Schema(description = "서류 결과 발표 기간") PeriodRequest documentResultPeriod,
    @NotNull(message = "finalResultPeriod shouldn't be null") @Schema(description = "최종 결과 발표 기간")
        PeriodRequest finalResultPeriod) {}
