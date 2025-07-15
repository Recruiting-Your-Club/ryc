package com.ryc.api.v2.Interview.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record InterviewReservationUpdateResponse(
    @Schema(description = "변경된 예약 ID") String interviewReservationId,
    @Schema(description = "변경된 면접 슬롯 정보") InterviewSlotGetResponse interviewSlot) {}
