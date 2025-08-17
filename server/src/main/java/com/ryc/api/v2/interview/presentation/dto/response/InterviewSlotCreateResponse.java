package com.ryc.api.v2.interview.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotCreateResponse(
    @Schema(description = "인터뷰 일정 ID") String interviewSlotId) {}
