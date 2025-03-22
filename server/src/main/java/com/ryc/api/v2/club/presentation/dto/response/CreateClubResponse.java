package com.ryc.api.v2.club.presentation.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

@Builder
public record CreateClubResponse(
        @NotEmpty(message = "clubId shouldn't be empty") String clubId) {
}

