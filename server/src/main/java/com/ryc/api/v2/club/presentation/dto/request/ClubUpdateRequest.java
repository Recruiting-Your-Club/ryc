package com.ryc.api.v2.club.presentation.dto.request;

import java.util.List;
import java.util.Optional;

import com.ryc.api.v2.club.domain.vo.ClubDetailImage;
import com.ryc.api.v2.club.domain.vo.ClubSummary;
import com.ryc.api.v2.club.domain.vo.ClubTag;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubUpdateRequest(
    @Schema(description = "동아리 이름") Optional<String> name,
    @Schema(description = "동아리 요약 설명") Optional<String> shortDescription,
    @Schema(description = "동아리 상세 설명") Optional<String> detailDescription,
    @Schema(description = "동아리 이미지 URL") Optional<String> imageUrl,
    @Schema(description = "동아리 썸네일 URL") Optional<String> thumbnailUrl,
    @Schema(description = "동아리 카테고리") Optional<String> category,
    @Schema(description = "동아리 태그 리스트") List<ClubTag> clubTags,
    @Schema(description = "동아리 요약 리스트") List<ClubSummary> clubSummaries,
    @Schema(description = "동아리 상세 이미지 리스트") List<ClubDetailImage> clubDetailImages) {

  public ClubUpdateRequest {
    clubTags = clubTags == null ? List.of() : clubTags;
    clubSummaries = clubSummaries == null ? List.of() : clubSummaries;
    clubDetailImages = clubDetailImages == null ? List.of() : clubDetailImages;
  }

  @Override
  public List<ClubTag> clubTags() {
    return List.copyOf(clubTags);
  }

  @Override
  public List<ClubSummary> clubSummaries() {
    return List.copyOf(clubSummaries);
  }

  @Override
  public List<ClubDetailImage> clubDetailImages() {
    return List.copyOf(clubDetailImages);
  }
}
