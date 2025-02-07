package com.ryc.api.v1.application.dto.response;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;

public record CreateApplicationFormResponse(@NotEmpty(message = "created shouldn't be empty") LocalDateTime created) {
}
