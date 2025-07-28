package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.domain.vo.ClubDetailImage;
import com.ryc.api.v2.club.domain.vo.ClubSummary;
import com.ryc.api.v2.club.domain.vo.ClubTag;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Club {

  private final String id;
  private final String name;
  private final String shortDescription;
  private final String detailDescription;
  private final String imageUrl;
  private final String thumbnailUrl;
  private final Category category;
  private final List<ClubTag> clubTags;
  private final List<ClubSummary> clubSummaries;
  private final List<ClubDetailImage> clubDetailImages;

  @Builder
  private Club(
      String id,
      String name,
      String shortDescription,
      String detailDescription,
      String imageUrl,
      String thumbnailUrl,
      Category category,
      List<ClubTag> clubTags,
      List<ClubSummary> clubSummaries,
      List<ClubDetailImage> clubDetailImages) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.imageUrl = imageUrl;
    this.thumbnailUrl = thumbnailUrl;
    this.category = category;
    this.clubTags = clubTags;
    this.clubSummaries = clubSummaries;
    this.clubDetailImages = clubDetailImages;

    if (detailDescription.isBlank()) {
      this.detailDescription = shortDescription;
    } else {
      this.detailDescription = detailDescription;
    }
  }

  /** Club 동아리 최초 생성시에만 사용 (id가 생성되기 전에만) */
  public static Club initialize(
      String name, String imageUrl, String thumbnailUrl, String category) {

    Category categoryEnum = Category.from(category);
    return Club.builder()
        .id(DEFAULT_INITIAL_ID) // 실제로 비즈니스 로직에서 사용되지 않음
        .name(name)
        .imageUrl(imageUrl)
        .thumbnailUrl(thumbnailUrl)
        .category(categoryEnum)
        .clubTags(new ArrayList<>())
        .clubSummaries(new ArrayList<>())
        .clubDetailImages(new ArrayList<>())
        .build();
  }

  public Club update(ClubUpdateRequest clubUpdateRequest) {
    String newName = clubUpdateRequest.name() == null ? this.name : clubUpdateRequest.name();
    String newShortDescription =
        clubUpdateRequest.shortDescription() == null
            ? this.shortDescription
            : clubUpdateRequest.shortDescription();
    String newDetailDescription =
        clubUpdateRequest.detailDescription() == null
            ? this.detailDescription
            : clubUpdateRequest.detailDescription();
    String newImageUrl =
        clubUpdateRequest.imageUrl() == null ? this.imageUrl : clubUpdateRequest.imageUrl();
    String newThumbnailUrl =
        clubUpdateRequest.thumbnailUrl() == null
            ? this.thumbnailUrl
            : clubUpdateRequest.thumbnailUrl();
    Category newCategory =
        clubUpdateRequest.category() == null
            ? this.category
            : Category.from(clubUpdateRequest.category());
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
