package com.ryc.api.v2.club.domain.vo;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;

import lombok.Builder;

@Builder
public record Club(
    String id,
    String name,
    String shortDescription,
    String detailDescription,
    String imageUrl,
    String thumbnailUrl,
    Category category,
    List<ClubTag> clubTags,
    List<ClubSummary> clubSummaries,
    List<ClubDetailImage> clubDetailImages,
    LocalDateTime createdAt,
    LocalDateTime updatedAt,
    Boolean deleted) {

  /** Club 동아리 최초 생성시에만 사용 (id가 생성되기 전에만) */
  public static Club initialize(ClubCreateRequest clubCreateRequest) {
    return Club.builder()
        .id(DEFAULT_INITIAL_ID) // 실제로 비즈니스 로직에서 사용되지 않음
        .name(clubCreateRequest.name())
        .imageUrl(clubCreateRequest.imageUrl())
        .thumbnailUrl(clubCreateRequest.thumbnailUrl())
        .category(clubCreateRequest.category())
        .clubTags(new ArrayList<>())
        .clubSummaries(new ArrayList<>())
        .clubDetailImages(new ArrayList<>())
        .deleted(false)
        .build();
  }

  public Club update(ClubUpdateRequest clubUpdateRequest) {
    String newName = clubUpdateRequest.name().orElse(this.name);
    String newShortDescription = clubUpdateRequest.shortDescription().orElse(this.shortDescription);
    String newDetailDescription =
        clubUpdateRequest.detailDescription().orElse(this.detailDescription);
    String newImageUrl = clubUpdateRequest.imageUrl().orElse(this.imageUrl);
    String newThumbnailUrl = clubUpdateRequest.thumbnailUrl().orElse(this.thumbnailUrl);
    Category newCategory =
        Category.valueOf(clubUpdateRequest.category().orElse(String.valueOf(this.category)));
    List<ClubTag> newClubTags =
        clubUpdateRequest.clubTags().isEmpty() ? this.clubTags : clubUpdateRequest.clubTags();
    List<ClubSummary> newClubSummaries =
        clubUpdateRequest.clubSummaries().isEmpty()
            ? this.clubSummaries
            : clubUpdateRequest.clubSummaries();
    List<ClubDetailImage> newClubDetailImages =
        clubUpdateRequest.clubDetailImages().isEmpty()
            ? this.clubDetailImages
            : clubUpdateRequest.clubDetailImages();

    return Club.builder()
        .id(this.id)
        .name(newName)
        .shortDescription(newShortDescription)
        .detailDescription(newDetailDescription)
        .imageUrl(newImageUrl)
        .thumbnailUrl(newThumbnailUrl)
        .category(newCategory)
        .clubTags(newClubTags)
        .clubSummaries(newClubSummaries)
        .clubDetailImages(newClubDetailImages)
        .build();
  }
}
