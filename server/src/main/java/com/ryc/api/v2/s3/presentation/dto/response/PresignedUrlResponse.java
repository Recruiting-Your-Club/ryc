package com.ryc.api.v2.s3.presentation.dto.response;

import lombok.Builder;

@Builder
public record PresignedUrlResponse (
        String presignedUrl,
        String fileMetadataId
) {
}
