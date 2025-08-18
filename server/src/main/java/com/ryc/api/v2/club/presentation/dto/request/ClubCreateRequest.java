package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubCreateRequest(
    @NotBlank(message = "동아리 이름은 비워둘 수 없습니다.") @Schema(description = "동아리 이름") String name,
    @NotBlank(message = "동아리 카테고리는 비워둘 수 없습니다.")
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
        String category,
    String representativeImage) {}
