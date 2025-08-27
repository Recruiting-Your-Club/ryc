package com.ryc.api.v2.email.presentation.dto.response;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;

public record EmailVerificationCodeResponse(
    @Schema(description = "만료 시각") LocalDateTime expiresAt) {}
