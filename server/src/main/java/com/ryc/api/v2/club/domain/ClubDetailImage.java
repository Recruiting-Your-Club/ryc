package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
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
