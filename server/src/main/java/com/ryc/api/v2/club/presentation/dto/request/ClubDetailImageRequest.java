package com.ryc.api.v2.club.presentation.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ClubDetailImageRequest(
    @Schema(description = "동아리 상세 이미지 ID") String id,
    @Schema(description = "동아리 상세 이미지 Url") String imageUrl,
    @Schema(description = "동아리 상세 이미지 썸네일 Url") String thumbnailUrl) {}
