package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

public record ClubSummaryRequest(
    @Schema(description = "동아리 요약 ID")
        @NotBlank(message = "동아리 요약 id는 빈값일 수 없습니다.")
        @UUID(message = "동아리 요약 id는 UUID 포멧이어야 합니다.")
        String id,
    @Schema(description = "동아리 요약 제목 값")
        @NotBlank(message = "동아리 요약 제목 값은 비워둘 수 없습니다.")
        @Size(max = 20, message = "동아리 요약 제목은 20자를 초과할 수 없습니다.")
        String title,
    @Schema(description = "동아리 요약 본문 값")
        @NotBlank(message = "동아리 요약 본문 값은 비워둘 수 없습니다.")
        @Size(max = 50, message = "동아리 요약 제목은 50자를 초과할 수 없습니다.")
        String content) {}
