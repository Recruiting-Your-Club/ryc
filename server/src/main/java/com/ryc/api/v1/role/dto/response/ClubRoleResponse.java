package com.ryc.api.v1.role.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;

public record ClubRoleResponse(
    @NotEmpty(message = "requestAt shouldn't be empty") LocalDateTime requestAt) {}
