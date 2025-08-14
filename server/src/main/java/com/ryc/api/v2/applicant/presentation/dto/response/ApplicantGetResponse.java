package com.ryc.api.v2.applicant.presentation.dto.response;

import java.time.LocalDateTime;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicantGetResponse(
    @Schema(description = "지원자 ID", example = "uuid-applicant-1") String applicantId,
    @Schema(description = "지원자 이름", example = "홍길동") String name,
    @Schema(description = "지원자 이메일", example = "gildong@example.com") String email,
    @Schema(description = "해당 공고의 지원자 이미지 수집 허용 여부", example = "true") boolean imageAllowed,
    @Schema(description = "지원자 이미지 존재 여부", example = "true") boolean imagePresent,
    @Schema(description = "지원자 원본 이미지 url", example = "https://example.com/original/profile1.jpg")
        String imageUrl,
    @Schema(description = "지원자 썸네일 이미지 url", example = "https://example.com/thumbnail/profile1.jpg")
        String thumbnailUrl,
    @Schema(description = "지원 상태", example = "DOCUMENT_PENDING") ApplicantStatus status,
    @Schema(description = "제출 일시", example = "2025-07-22T10:00:00") LocalDateTime submittedAt,
    @Schema(description = "프로필 이미지 파일 정보") FileGetResponse profileImage) {}
