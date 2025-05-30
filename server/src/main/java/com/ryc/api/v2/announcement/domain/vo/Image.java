package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.announcement.presentation.dto.request.ImageRequest;

import lombok.Builder;

@Builder
public record Image(String thumbnailUrl, String imageUrl) {
  public static Image initialize(ImageRequest imageRequest) {
    return Image.builder()
        .thumbnailUrl(imageRequest.thumbnailImageUrl())
        .imageUrl(imageRequest.imageUrl())
        .build();
  }
}
