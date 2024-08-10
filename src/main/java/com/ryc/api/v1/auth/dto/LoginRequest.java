package com.ryc.api.v1.auth.dto;

import jakarta.validation.constraints.NotEmpty;

public record LoginRequest(@NotEmpty(message = "email is empty") String email,
                           @NotEmpty(message = "password is empty") String password) {
}
