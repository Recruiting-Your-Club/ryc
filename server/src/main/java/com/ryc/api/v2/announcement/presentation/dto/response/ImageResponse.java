package com.ryc.api.v2.announcement.presentation.dto.response;

import com.ryc.api.v2.announcement.domain.AnnouncementImage;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ImageResponse(
    @Schema(description = "파일 메타데이터 ID", example = "123e4567-e89b-12d3-a456-426614174000")
        String id,
    @Schema(description = "파일 메타데이터 ID", example = "123e4567-e89b-12d3-a456-426614174000")
        String fileMetadataId,
    @Schema(description = "원본 url", example = "announcements/uuid/images/uuid_filename.jpg")
        String originUrl,
    @Schema(description = "썸네일 url", example = "announcements/uuid/images/uuid_thumbnail.jpg")
        String thumbnailUrl,
    @Schema(description = "파일 유형", example = "image/jpeg") String ContentType) {

  public static ImageResponse from(AnnouncementImage image) {
    if (image == null) {
      return null;
    }

    // TODO: FileMetadataEntity에서 s3Key와 thumbnailS3Key를 조회해야 함
    return ImageResponse.builder()
        .id(image.getId())
        .fileMetadataId(image.getFileMetadataId())
        .originUrl("TODO_S3_KEY")
        .thumbnailUrl("TODO_THUMBNAIL_S3_KEY")
        .build();
  }
}
