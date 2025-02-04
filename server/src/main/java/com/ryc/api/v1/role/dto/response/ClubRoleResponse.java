package com.ryc.api.v1.role.dto.response;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;

public record ClubRoleResponse(@NotEmpty(message = "requestAt shouldn't be empty") LocalDateTime requestAt) {
}