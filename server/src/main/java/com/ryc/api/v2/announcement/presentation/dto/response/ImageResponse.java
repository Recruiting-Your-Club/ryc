package com.ryc.api.v2.announcement.presentation.dto.response;

import com.ryc.api.v2.announcement.domain.vo.Image;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

/** 이미지 정보 응답 DTO */
@Builder
public record ImageResponse(
    @Schema(description = "썸네일 이미지 URL", example = "https://example.com/thumbnail.jpg")
        String thumbnailImageUrl,
    @Schema(description = "원본 이미지 URL", example = "https://example.com/image.jpg")
        String imageUrl) {
  /** 도메인 객체에서 응답 DTO를 생성하는 정적 팩토리 메서드 */
  public static ImageResponse from(Image image) {
    if (image == null) {
      return null;
    }

    return ImageResponse.builder()
        .thumbnailImageUrl(image.thumbnailUrl())
        .imageUrl(image.imageUrl())
        .build();
  }
}
