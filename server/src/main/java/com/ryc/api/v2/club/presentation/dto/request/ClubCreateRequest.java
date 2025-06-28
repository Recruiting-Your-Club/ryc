package com.ryc.api.v2.club.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.club.domain.Category;

import lombok.Builder;

@Builder
public record ClubCreateRequest(
    @NotBlank(message = "club name shouldn't be blank") String name,
    @NotNull(message = "club category shouldn't be null") Category category,
    String imageUrl,
    String thumbnailUrl) {}
