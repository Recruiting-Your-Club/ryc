package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.email.presentation.dto.request.InterviewSlotDetailRequest;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotCreateRequest(
    @Schema(description = "면접 슬롯 정보") @NotNull(message = "면접 슬롯 정보는 null일 수 없습니다.") @Valid
        InterviewSlotDetailRequest slotDetailRequest,
    @Schema(description = "면접 당 진행 시간(분)")
        @NotNull(message = "면접 당 진행 시간은 null일 수 없습니다.")
        @Min(value = 1, message = "면접 당 진행 시간은 0분 이하일 수 없습니다.")
        Integer interviewDuration) {}
