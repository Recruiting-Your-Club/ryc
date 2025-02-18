package com.ryc.api.v1.evaluation.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.constant.RequestStatus;

import lombok.Builder;

@Builder
public record GetPermissionApplicationResponse(
    @NotEmpty(message = "permissionApplicationId shouldn't be empty")
        String permissionApplicationId,
    @NotEmpty(message = "username shouldn't be empty") String username,
    @NotNull(message = "requestStatus shouldn't be null") RequestStatus requestStatus,
    @NotNull(message = "requestAt shouldn't be null") LocalDateTime requestAt) {}
