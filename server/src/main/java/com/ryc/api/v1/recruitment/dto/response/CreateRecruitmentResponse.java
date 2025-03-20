package com.ryc.api.v1.recruitment.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record CreateRecruitmentResponse(
    @NotNull(message = "createdAt shouldn't be null") LocalDateTime createdAt) {}
