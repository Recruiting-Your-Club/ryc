package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import io.swagger.v3.oas.annotations.media.Schema;

public record ClubDetailImageRequest(
    @Pattern(regexp = "^[0-9a-fA-F\\-]{36}$", message = "id는 유효한 UUID 형식이어야 합니다.")
        @Schema(description = "동아리 상세 이미지 ID")
        String id,
    @NotBlank(message = "동아리 상세 이미지 Url은 비워둘 수 없습니다.") @Schema(description = "동아리 상세 이미지 Url")
        String imageUrl,
    @Schema(description = "동아리 상세 이미지 썸네일 Url") String thumbnailUrl) {}
