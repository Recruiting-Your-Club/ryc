package com.ryc.api.v1.application.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record UpdateAnswerAccessibilityResponse(
    @NotNull(message = "updated shouldn't be empty") LocalDateTime updated) {}
