package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReservationUpdatedRequest(
    @Schema(description = "예약을 변경할 인터뷰 슬롯 ID") @NotBlank(message = "예약을 변경할 인터뷰 슬롯 ID는 필수입니다.")
        String interviewSlotId) {}
