package com.ryc.api.v2.interview.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReservationRequest(
    @Schema(description = "지원자 ID") @NotBlank(message = "지원자 ID는 필수입니다.") String applicantId) {}
