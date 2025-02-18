package com.ryc.api.v1.evaluation.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record CreatePermissionApplicationResponse(
    @NotNull(message = "requestAt shouldn't be null") LocalDateTime requestAt) {}
