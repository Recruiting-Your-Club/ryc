package com.ryc.api.v2.interview.presentation.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record InterviewInfoGetResponse(
    @Schema(description = "면접 슬롯 정보") InterviewSlotGetResponse interviewSlotGetResponse,
    @Schema(description = "면접 예약 정보 목록")
        List<InterviewReservationGetResponse> interviewReservations) {}
