package com.ryc.api.v2.club.presentation.dto.response;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubCreateResponse(
    @Schema(description = "동아리 ID") @NotBlank(message = "club id shouldn't be blank")
        String clubId) {}
