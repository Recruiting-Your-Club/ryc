package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.constraints.NotEmpty;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @param thumbnailImageUrl 썸네일 url
 * @param imageUrl 이미지 url
 * @brief 이미지 Request Dto
 */
@Builder
public record ImageRequest(
    @Schema(description = "썸네일 이미지 URL", example = "https://example.com/thumbnail.jpg")
        @NotEmpty(message = "thumbnailImageUrl shouldn't be empty")
        String thumbnailImageUrl,
    @Schema(description = "원본 이미지 URL", example = "https://example.com/image.jpg")
        @NotEmpty(message = "imageUrl shouldn't be empty")
        String imageUrl) {}
