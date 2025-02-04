package com.ryc.api.v1.club.dto.response;

import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;

import java.util.List;

@Builder
public record ClubOverviewResponse(@NotEmpty(message = "clubId shouldn't be empty") String clubId,
                                   @NotEmpty(message = "thumbnailUrl shouldn't be empty") String thumbnailUrl,
                                   @NotEmpty(message = "categories shouldn't be empty") List<String> categories) {
}
