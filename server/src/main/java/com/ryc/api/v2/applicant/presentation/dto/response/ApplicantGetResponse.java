package com.ryc.api.v2.applicant.presentation.dto.response;

import java.time.LocalDateTime;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicantGetResponse(
    @Schema(description = "지원자 ID", example = "uuid-applicant-1") String applicantId,
    @Schema(description = "지원자 이름", example = "홍길동") String name,
    @Schema(description = "지원자 이메일", example = "gildong@example.com") String email,
    @Schema(description = "지원 상태", example = "DOCUMENT_PENDING") ApplicantStatus status,
    @Schema(description = "제출 일시", example = "2025-07-22T10:00:00") LocalDateTime submittedAt) {}
