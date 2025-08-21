package com.ryc.api.v2.file.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record AccessPresignedUrlGetRequest(
    @NotBlank(message = "metadataId shouldn't be blank")
        @Schema(example = "e23d9b4f-5d5e-4a6b-9c6b-7b6b6b6b6b6b", description = "metadataId")
        String metadataId,
    @Schema(example = "e23d9b4f-5d5e-4a6b-9c6b-7b6b6b6b6b6b", description = "accessToken")
        String accessToken) {}
