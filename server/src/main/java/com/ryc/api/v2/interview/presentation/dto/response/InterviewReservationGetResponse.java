package com.ryc.api.v2.interview.presentation.dto.response;

import com.ryc.api.v2.applicant.presentation.dto.response.ApplicantSummaryResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record InterviewReservationGetResponse(
    @Schema(description = "면접 예약 ID") String interviewReservationId,
    @Schema(description = "지원자 정보") ApplicantSummaryResponse applicantSummary) {}
