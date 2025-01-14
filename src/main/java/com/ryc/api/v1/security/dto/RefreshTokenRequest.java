package com.ryc.api.v1.security.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public record RefreshTokenRequest(
        @NotEmpty(message = "Refresh Token is empty") String refreshToken
) {
}
