package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReservationRequest(
    @Schema(description = "지원자 ID")
        @NotBlank(message = "지원자 아이디는 빈 값일 수 없습니다.")
        @UUID(message = "지원자 id는 UUID 포멧을 준수하여야 합니다.")
        String applicantId) {}
