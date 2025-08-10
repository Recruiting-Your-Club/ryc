package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.club.domain.enums.Category;
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
  private final Category category;
  private final List<ClubTag> clubTags;
  private final List<ClubSummary> clubSummaries;

  @Builder
  private Club(
      String id,
      String name,
      String shortDescription,
      String detailDescription,
      Category category,
      List<ClubTag> clubTags,
      List<ClubSummary> clubSummaries) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.category = category;
    this.clubTags = clubTags;
    this.clubSummaries = clubSummaries;

    if (detailDescription == null || detailDescription.isBlank()) {
      this.detailDescription = shortDescription;
    } else {
      this.detailDescription = detailDescription;
    }
  }

  /** Club 동아리 최초 생성시에만 사용 (id가 생성되기 전에만) */
  public static Club initialize(String name, String category) {

    Category categoryEnum = Category.from(category);
    return Club.builder()
        .id(DEFAULT_INITIAL_ID) // 실제로 비즈니스 로직에서 사용되지 않음
        .name(name)
        .category(categoryEnum)
        .clubTags(new ArrayList<>())
        .clubSummaries(new ArrayList<>())
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

    return Club.builder()
        .id(this.id)
        .name(newName)
        .shortDescription(newShortDescription)
        .detailDescription(newDetailDescription)
        .category(newCategory)
        .clubTags(newClubTags)
        .clubSummaries(newClubSummaries)
        .build();
  }
}
