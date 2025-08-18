package com.ryc.api.v2.file.domain.event;

import lombok.Builder;

@Builder
public record FileMoveRequest(String fileMetadataId, String tempS3Key, String finalS3Key) {}
