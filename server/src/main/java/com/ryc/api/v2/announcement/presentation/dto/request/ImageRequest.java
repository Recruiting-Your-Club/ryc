package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/**
 * @brief 이미지 Request Dto
 */
@Builder
public record ImageRequest(
    @NotBlank(message = "imageMetaDataId shouldn't be blank")
        @Schema(description = "이미지 meta data id", example = "e223e4567-e89b-12d3-a456-426614174000")
        String imageMetaDataId) {}
