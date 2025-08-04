package com.ryc.api.v2.s3.presentation.dto.response;

public record PresignedUrlResponse (
        String presignedUrl,
        String fileMetadataId
) {
}
