package com.ryc.api.v2.interview.presentation.dto.response;

import com.ryc.api.v2.announcement.presentation.dto.response.PeriodResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record InterviewSlotGetResponse(
    @Schema(description = "면접 슬롯 ID") String id,
    @Schema(description = "면접 기간 정보") PeriodResponse period,
    @Schema(description = "최대 인원 수") Integer maxNumberOfPeople,
    @Schema(description = "현재 인원 수") Integer currentNumberOfPeople) {}
