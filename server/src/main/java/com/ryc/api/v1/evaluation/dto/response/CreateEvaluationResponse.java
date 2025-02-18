package com.ryc.api.v1.evaluation.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record CreateEvaluationResponse(
    @NotNull(message = "created shouldn't be empty") LocalDateTime created) {}
