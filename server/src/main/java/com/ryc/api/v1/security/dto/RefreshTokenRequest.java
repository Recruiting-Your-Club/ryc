package com.ryc.api.v1.security.dto;

import jakarta.validation.constraints.NotEmpty;

public record RefreshTokenRequest(
    @NotEmpty(message = "Refresh Token is empty") String refreshToken) {}
