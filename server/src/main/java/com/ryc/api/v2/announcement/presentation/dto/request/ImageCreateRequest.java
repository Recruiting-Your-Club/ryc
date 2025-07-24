package com.ryc.api.v2.announcement.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.Builder;

@Builder
public record ImageCreateRequest(@NotBlank String fileMetadataId) {}
