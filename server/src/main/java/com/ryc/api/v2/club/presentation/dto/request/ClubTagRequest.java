package com.ryc.api.v2.club.presentation.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record ClubTagRequest(
    @Schema(description = "동아리 태그 ID") String id,
    @Schema(description = "동아리 태그") String name) {}
