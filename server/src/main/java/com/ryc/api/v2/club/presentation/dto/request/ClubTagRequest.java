package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubTagRequest(
    @Schema(description = "동아리 태그 ID")
        @NotBlank(message = "동아리 태그 id는 빈값일 수 없습니다.")
        @UUID(message = "동아리 태그 id는 UUID 포멧이어야 합니다.")
        String id,
    @Schema(description = "동아리 태그")
        @NotBlank(message = "동아리 태그 이름은 비워둘 수 없습니다.")
        @Size(max = 30, message = "동아리 태그 이름은 30자를 초과할 수 없습니다.")
        String name) {}
