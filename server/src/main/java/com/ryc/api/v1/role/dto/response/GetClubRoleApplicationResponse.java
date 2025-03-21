package com.ryc.api.v1.role.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record GetClubRoleApplicationResponse(
    @NotEmpty(message = "clubRoleApplicationId shouldn't be empty") String clubRoleApplicationId,
    @NotEmpty(message = "username shouldn't be empty") String username,
    @NotNull(message = "requestAt shouldn't be null") LocalDateTime requestAt) {}
