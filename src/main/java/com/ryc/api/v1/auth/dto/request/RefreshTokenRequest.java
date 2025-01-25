package com.ryc.api.v1.auth.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record RefreshTokenRequest(
        @NotEmpty(message = "Refresh Token is empty") String refreshToken
) {
}
