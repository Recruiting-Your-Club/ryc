package com.ryc.api.v1.role.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.common.constant.RequestStatus;

import lombok.Builder;

@Builder
public record UpdateStatusResponse(
    @NotNull(message = "reviewedAt shouldn't be empty") LocalDateTime reviewedAt,
    @NotNull(message = "requestStatus shouldn't be empty") RequestStatus requestStatus,
    @NotEmpty(message = "reviewedBy shouldn't be empty") String reviewedBy) {}
