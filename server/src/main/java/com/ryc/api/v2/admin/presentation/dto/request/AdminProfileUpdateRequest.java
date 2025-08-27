package com.ryc.api.v2.admin.presentation.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record AdminProfileUpdateRequest(
    @Schema(description = "사용자 대표 이미지") String representativeImage) {}
