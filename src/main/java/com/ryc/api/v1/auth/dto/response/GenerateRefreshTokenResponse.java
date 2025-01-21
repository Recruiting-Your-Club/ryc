package com.ryc.api.v1.auth.dto.response;

import jakarta.validation.constraints.NotEmpty;

public record GenerateRefreshTokenResponse(@NotEmpty(message = "refresh token is empty") String refreshToken,
                                           @NotEmpty(message = "access token is empty") String accessToken) {
}
