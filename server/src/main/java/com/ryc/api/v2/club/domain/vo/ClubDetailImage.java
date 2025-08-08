package com.ryc.api.v2.club.domain.vo;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

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

  public static ClubDetailImage initialize(String imageUrl, String thumbnailUrl) {
    return ClubDetailImage.builder()
        .id(DEFAULT_INITIAL_ID)
        .imageUrl(imageUrl)
        .thumbnailUrl(thumbnailUrl)
        .build();
  }
}
