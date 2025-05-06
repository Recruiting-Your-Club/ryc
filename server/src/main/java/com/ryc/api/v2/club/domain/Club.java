package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;

import lombok.*;

@Getter
@Builder
public class Club {

  private final String id;
  private final String name;
  private final String shortDescription;
  private final String imageUrl;
  private final String thumbnailUrl;
  private final Category category;

  @Builder.Default private final List<ClubTag> clubTags = new ArrayList<>();
  @Builder.Default private final List<ClubSummary> clubSummaries = new ArrayList<>();
  @Builder.Default private final List<ClubDetailImage> clubDetailImages = new ArrayList<>();
  @Builder.Default private final String detailDescription = "";

  @Builder.Default private final Boolean deleted = Boolean.FALSE;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  /** Club 동아리 최초 생성시에만 사용 (id가 생성되기 전에만) */
  public static Club initialize(
      ClubCreateRequest clubCreateRequest,
      final String imageUrl,
      final String thumbnailUrl,
      final List<ClubTag> clubTags) {
    return Club.builder()
        .id(DEFAULT_INITIAL_ID) // 실제로 비즈니스 로직에서 사용되지 않음
        .name(clubCreateRequest.name())
        .shortDescription(clubCreateRequest.shortDescription())
        .imageUrl(imageUrl)
        .thumbnailUrl(thumbnailUrl)
        .category(clubCreateRequest.category())
        .clubTags(clubTags)
        .deleted(false)
        .build();
  }
}
