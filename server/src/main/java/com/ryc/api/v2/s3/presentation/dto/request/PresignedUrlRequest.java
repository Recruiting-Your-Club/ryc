package com.ryc.api.v2.s3.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record PresignedUrlRequest(
        @NotBlank String fileName,
        @NotNull String fileType,
        @NotBlank String associatedId,
        @NotBlank String contentType
) {
}
