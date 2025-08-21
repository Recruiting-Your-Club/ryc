package com.ryc.api.v2.role.presentation.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubInviteCreatedResponse(
    @Schema(description = "초대 코드") String inviteCode,
    @Schema(description = "만료 일자") LocalDateTime expiresAt) {}
