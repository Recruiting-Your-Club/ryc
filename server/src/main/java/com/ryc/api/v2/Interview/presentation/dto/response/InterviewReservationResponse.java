package com.ryc.api.v2.Interview.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReservationResponse(@Schema(description = "면접 예약 ID") String id) {}
