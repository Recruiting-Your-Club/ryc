package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReservationUpdatedRequest(
    @Schema(description = "예약을 변경할 인터뷰 슬롯 ID")
        @NotBlank(message = "예약을 변경할 인터뷰 슬롯 ID는 빈 값일 수 없습니다.")
        @UUID(message = "예약을 변경할 인터뷰 슬롯 ID는 UUID 포멧을 준수하여야 합니다.")
        String interviewSlotId) {}
