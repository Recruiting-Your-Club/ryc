package com.ryc.api.v2.club.domain;

import com.ryc.api.v2.club.presentation.dto.request.ClubDetailImageRequest;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubDetailImage {

  private final String id;
  private final String imageUrl;
  private final String thumbnailUrl;

  public static ClubDetailImage initialize(ClubDetailImageRequest request) {
    return ClubDetailImage.builder()
        .id(request.id())
        .imageUrl(request.imageUrl())
        .thumbnailUrl(request.thumbnailUrl())
        .build();
  }
}
