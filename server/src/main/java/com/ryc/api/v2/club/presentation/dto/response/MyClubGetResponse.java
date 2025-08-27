package com.ryc.api.v2.club.presentation.dto.response;

import com.ryc.api.v2.role.domain.enums.Role;

import io.swagger.v3.oas.annotations.media.Schema;

public record MyClubGetResponse(
    @Schema(description = "나의 동아리 데이터") DetailClubResponse myClubResponse,
    @Schema(description = "나의 역할") Role myRole) {}
