package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.common.dto.request.PeriodRequest;

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
@Schema(
    description =
        """
        공고 기간 정보 \n
        applicationPeriod : 지원 기간 \n
        interviewPeriod : 면접 기간 \n
        documentResultPeriod : 지원서 결과 기간 \n
        finalResultPeriod : 최종 발표 기간 \n
        - hasInterview = true : applicationPeriod -> documentResultPeriod -> interviewPeriod -> finalResultPeriod
        - hasInterview = false : applicationPeriod -> finalResultPeriod
        필요 없는 값은 공백 또는 null 명시
        """)
public record AnnouncementPeriodInfoRequest(
    @Schema(description = "지원 기간") @NotNull(message = "지원기간은 빈 값 일 수 없습니다.") @Valid
        PeriodRequest applicationPeriod,
    @Schema(description = "면접 기간") @Valid PeriodRequest interviewPeriod,
    @Schema(description = "서류 결과 발표 기간") @Valid PeriodRequest documentResultPeriod,
    @Schema(description = "최종 발표 기간") @Valid PeriodRequest finalResultPeriod) {}
