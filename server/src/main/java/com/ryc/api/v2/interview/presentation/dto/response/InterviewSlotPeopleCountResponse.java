package com.ryc.api.v2.interview.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotPeopleCountResponse(
    @Schema(description = "최대 인원 수") Integer maxNumberOfPeople,
    @Schema(description = "현재 인원 수") Integer currentNumberOfPeople) {}
