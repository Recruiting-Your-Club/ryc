package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.constraints.NotNull;

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
    @NotNull PeriodRequest applicationPeriod,
    PeriodRequest interviewPeriod,
    @NotNull PeriodRequest documentResultPeriod,
    PeriodRequest finalResultPeriod) {}
