package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.presentation.dto.request.ClubUpdateRequest;
import com.ryc.api.v2.util.DataResolveUtil;

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

    // 1. 정제
    String sanitizedName = DataResolveUtil.sanitizeString(name);
    String sanitizedShortDescription = DataResolveUtil.sanitizeString(shortDescription);
    String sanitizedDetailDescription = DataResolveUtil.sanitizeString(detailDescription);

    // 2. 선택 멤버 변수 기본값 처리
    List<ClubTag> resolvedClubTags = clubTags != null ? clubTags : List.of();
    List<ClubSummary> resolvedClubSummaries = clubSummaries != null ? clubSummaries : List.of();

    // 3. 검증
    ClubValidator.validate(
        id,
        sanitizedName,
        sanitizedShortDescription,
        sanitizedDetailDescription,
        category,
        resolvedClubTags,
        resolvedClubSummaries);

    // 4. 할당
    this.id = id;
    this.name = sanitizedName;
    this.shortDescription = sanitizedShortDescription;
    this.detailDescription = sanitizedDetailDescription;
    this.category = category;
    this.clubTags = resolvedClubTags;
    this.clubSummaries = resolvedClubSummaries;
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
    Category newCategory = Category.from(clubUpdateRequest.category());

    List<ClubTag> newClubTags =
        clubUpdateRequest.clubTags().stream().map(ClubTag::initialize).toList();
    List<ClubSummary> newClubSummaries =
        clubUpdateRequest.clubSummaries().stream().map(ClubSummary::initialize).toList();

    return Club.builder()
        .id(this.id)
        .name(clubUpdateRequest.name())
        .shortDescription(clubUpdateRequest.shortDescription())
        .detailDescription(clubUpdateRequest.detailDescription())
        .category(newCategory)
        .clubTags(newClubTags)
        .clubSummaries(newClubSummaries)
        .build();
  }
}
