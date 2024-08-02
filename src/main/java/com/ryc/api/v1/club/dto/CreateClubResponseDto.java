package com.ryc.api.v1.club.dto;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;

public record CreateClubResponseDto(@NotEmpty(message = "created shouldn't be empty") LocalDateTime created) {
}
