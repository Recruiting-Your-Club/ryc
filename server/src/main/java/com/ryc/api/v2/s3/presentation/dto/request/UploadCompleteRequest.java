package com.ryc.api.v2.s3.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UploadCompleteRequest (
        @NotBlank
        String fileMetadataId
) {
}
