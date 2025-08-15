package com.ryc.api.v2.announcement.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ImageResponse(
    @Schema(description = "파일 메타데이터 ID", example = "123e4567-e89b-12d3-a456-426614174000")
        String fileMetadataId,
    @Schema(description = "원본 url", example = "announcements/uuid/images/uuid_filename.jpg")
        String imageUrl) {

  public static ImageResponse of(String fileMetadataId, String imageUrl) {
    return ImageResponse.builder().fileMetadataId(fileMetadataId).imageUrl(imageUrl).build();
  }
}
