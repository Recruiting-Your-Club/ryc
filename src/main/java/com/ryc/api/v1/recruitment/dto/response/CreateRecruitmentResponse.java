package com.ryc.api.v1.recruitment.dto.response;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateRecruitmentResponse(@NotNull(message = "createdAt shouldn't be null") LocalDateTime createdAt) {
}
