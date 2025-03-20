package com.ryc.api.v1.application.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;

public record CreateApplicationResponse(
    @NotEmpty(message = "created shouldn't be empty") LocalDateTime created) {}
