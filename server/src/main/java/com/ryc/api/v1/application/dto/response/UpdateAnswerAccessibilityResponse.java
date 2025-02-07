package com.ryc.api.v1.application.dto.response;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record UpdateAnswerAccessibilityResponse(@NotNull(message = "updated shouldn't be empty") LocalDateTime updated) {
}
