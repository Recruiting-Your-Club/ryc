package com.ryc.api.v2.auth.service.dto;

import jakarta.validation.constraints.NotEmpty;

public record TokenRefreshResult(
    @NotEmpty(message = "accessToken is empty") String accessToken,
    @NotEmpty(message = "refreshToken is empty") String refreshToken) {}
