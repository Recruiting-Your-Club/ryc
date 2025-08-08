package com.ryc.api.v2.club.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubUpdateRequest(
    @NotBlank(message = "동아리 이름은 비워둘 수 없습니다.") @Schema(description = "동아리 이름") String name,
    @Schema(description = "동아리 요약 설명") String shortDescription,
    @Schema(description = "동아리 상세 설명") String detailDescription,
    @Schema(description = "동아리 이미지 URL") String imageUrl,
    @Schema(description = "동아리 썸네일 URL") String thumbnailUrl,
    @NotBlank(message = "동아리 카테고리는 비워둘 수 없습니다.")
        @Schema(
            description = "동아리 카테고리",
            allowableValues = {
              "PERFORMANCE_ARTS",
              "CULTURE",
              "SPORTS",
              "ACADEMIC",
              "VOLUNTEER",
              "RELIGION"
            })
        String category,
    @Valid @Schema(description = "동아리 태그 리스트") List<ClubTagRequest> clubTags,
    @Valid @Schema(description = "동아리 요약 리스트") List<ClubSummaryRequest> clubSummaries,
    @Valid @Schema(description = "동아리 상세 이미지 리스트") List<ClubDetailImageRequest> clubDetailImages) {

  public ClubUpdateRequest {
    clubTags = clubTags == null ? List.of() : clubTags;
    clubSummaries = clubSummaries == null ? List.of() : clubSummaries;
    clubDetailImages = clubDetailImages == null ? List.of() : clubDetailImages;
  }

  @Override
  public List<ClubTagRequest> clubTags() {
    return List.copyOf(clubTags);
  }

  @Override
  public List<ClubSummaryRequest> clubSummaries() {
    return List.copyOf(clubSummaries);
  }

  @Override
  public List<ClubDetailImageRequest> clubDetailImages() {
    return List.copyOf(clubDetailImages);
  }
}
