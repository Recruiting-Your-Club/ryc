package com.ryc.api.v1.club.dto.response;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotEmpty;

public record CreateClubResponse(
    @NotEmpty(message = "created shouldn't be empty") LocalDateTime created) {}
