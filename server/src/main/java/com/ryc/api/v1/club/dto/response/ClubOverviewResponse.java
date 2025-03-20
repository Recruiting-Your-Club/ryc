package com.ryc.api.v1.club.dto.response;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

import lombok.Builder;

@Builder
public record ClubOverviewResponse(
    @NotEmpty(message = "clubId shouldn't be empty") String clubId,
    @NotEmpty(message = "thumbnailUrl shouldn't be empty") String thumbnailUrl,
    @NotEmpty(message = "categories shouldn't be empty") List<String> categories) {}
