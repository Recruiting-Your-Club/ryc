package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.service.dto.ClubImageDTO;
import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record DetailClubResponse(
    @Schema(description = "동아리 ID") String id,
    @Schema(description = "동아리 이름") String name,
    @Schema(description = "동아리 짧은 설명") String shortDescription,
    @Schema(description = "동아리 상세 설명") String detailDescription,
    @Schema(description = "동아리 대표 이미지") FileGetResponse representativeImage,
    @Schema(description = "동아리 카테고리") Category category,
    @Schema(description = "동아리 태그 리스트") List<ClubTag> clubTags,
    @Schema(description = "동아리 요약 리스트") List<ClubSummary> clubSummaries,
    @Schema(description = "동아리 상세 이미지 리스트") List<FileGetResponse> clubDetailImages) {

  public static DetailClubResponse from(Club club, ClubImageDTO clubImageResponse) {
    return DetailClubResponse.builder()
        .id(club.getId())
        .name(club.getName())
        .shortDescription(club.getShortDescription())
        .detailDescription(club.getDetailDescription())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .representativeImage(clubImageResponse.representativeImage())
        .clubDetailImages(clubImageResponse.detailImages())
        .build();
  }
}
