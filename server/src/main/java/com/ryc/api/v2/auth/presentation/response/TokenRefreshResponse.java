package com.ryc.api.v2.auth.presentation.response;

import jakarta.validation.constraints.NotEmpty;

import lombok.Builder;

@Builder
public record TokenRefreshResponse(
    @NotEmpty(message = "accessToken is empty") String accessToken) {}
