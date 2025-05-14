package com.ryc.api.v2.club.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import lombok.Builder;

@Builder
public record ClubCreateResponse(@Schema(description = "동아리 ID", example = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d") @NotBlank(message = "clubId shouldn't be empty") String clubId) {}
