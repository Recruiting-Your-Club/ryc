package com.ryc.api.v2.file.presentation.dto.response;

import lombok.Builder;

@Builder
public record UploadUrlResponse(String presignedUrl, String fileMetadataId) {}
