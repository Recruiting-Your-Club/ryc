package com.ryc.api.v1.evaluation.dto.response;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreatePermissionApplicationResponse(@NotNull(message = "requestAt shouldn't be null") LocalDateTime requestAt) {
}
