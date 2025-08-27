package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubCreateRequest(
    @Schema(description = "동아리 이름")
        @NotBlank(message = "동아리 이름은 비워둘 수 없습니다.")
        @Min(value = 2, message = "동아리 이름은 2자 이상이어야 합니다.")
        @Max(value = 50, message = "동아리 이름은 50자 이하여야 합니다.")
        String name,
    @Schema(
            description = "카테고리",
            allowableValues = {
              "PERFORMANCE_ARTS",
              "CULTURE",
              "SPORTS",
              "ACADEMIC",
              "VOLUNTEER",
              "RELIGION"
            })
        @NotBlank(message = "동아리 카테고리는 비워둘 수 없습니다.")
        String category,
    String representativeImage) {}
