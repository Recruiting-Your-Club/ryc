package com.ryc.api.v2.auth.presentation.response;

import jakarta.validation.constraints.NotEmpty;

public record RegisterResponse(@NotEmpty(message = "adminId is empty") String adminId) {}
