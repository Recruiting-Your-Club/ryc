package com.ryc.api.v1.auth.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;

public record RegisterResponse(@NotEmpty(message = "created is empty") LocalDateTime created) {}
