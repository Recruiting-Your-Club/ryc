package com.ryc.api.v1.club.dto.response;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDateTime;

public record CreateClubResponse(@NotEmpty(message = "created shouldn't be empty") LocalDateTime created) {
}
