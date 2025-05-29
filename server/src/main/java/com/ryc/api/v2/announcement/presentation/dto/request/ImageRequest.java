package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.constraints.NotEmpty;

import lombok.Builder;

/**
 * @param thumbnailImageUrl 썸네일 url
 * @param imageUrl 이미지 url
 * @brief 이미지 Request Dto
 */
@Builder
public record ImageRequest(
    @NotEmpty(message = "thumbnailImageUrl shouldn't be empty") String thumbnailImageUrl,
    @NotEmpty(message = "imageUrl shouldn't be empty") String imageUrl) {}
