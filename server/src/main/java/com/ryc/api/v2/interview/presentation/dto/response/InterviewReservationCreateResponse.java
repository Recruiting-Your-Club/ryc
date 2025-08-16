package com.ryc.api.v2.interview.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReservationCreateResponse(@Schema(description = "면접 예약 ID") String interviewReservationId) {}
