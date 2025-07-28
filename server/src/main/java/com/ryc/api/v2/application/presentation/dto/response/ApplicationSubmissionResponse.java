package com.ryc.api.v2.application.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationSubmissionResponse(
    @Schema(description = "지원자 ID", example = "e2a1b7b4-6c6e-4d2a-8f8b-0b8b8b8b8b8b")
        String applicantId,
    @Schema(description = "지원-ID", example = "e2a1b7b4-6c6e-4d2a-8f8b-0b8b8b8b8b8b")
        String applicationId) {

  public static ApplicationSubmissionResponse of(String applicantId, String applciationId) {
    return ApplicationSubmissionResponse.builder()
        .applicantId(applicantId)
        .applicationId(applciationId)
        .build();
  }
}
