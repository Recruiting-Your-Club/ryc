package com.ryc.api.v1.club.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.util.List;

@Builder
public record ClubResponse(@NotEmpty(message = "clubName shouldn't be empty") String clubName,
                           @NotEmpty(message = "clubImageUrl shouldn't be empty") String clubImageUrl,
                           @NotEmpty(message = "clubDescription shouldn't be empty") String clubDescription,
                           @NotEmpty(message = "categories shouldn't be empty") List<String> categories) {
}