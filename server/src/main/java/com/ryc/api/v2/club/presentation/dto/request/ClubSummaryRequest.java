package com.ryc.api.v2.club.presentation.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ClubSummaryRequest(
    @Schema(description = "동아리 요약 ID") String id,
    @Schema(description = "동아리 요약 키 값") String title,
    @Schema(description = "동아리 요약 본문 값") String value) {}
