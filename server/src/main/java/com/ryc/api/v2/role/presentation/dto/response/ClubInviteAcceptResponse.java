package com.ryc.api.v2.role.presentation.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubInviteAcceptResponse(
    @Schema(description = "동아리 권한 ID") String clubRoleId,
    @Schema(
            description = "동아리 역할",
            allowableValues = {"OWNER", "MEMBER"})
        String role,
    @Schema(description = "동아리 가입 날짜와 시간") LocalDateTime joinedAt) {}
