package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.club.domain.ClubDetailImage;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.domain.enums.Category;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubGetResponse(
    @Schema(description = "동아리 ID") String id,
    @Schema(description = "동아리 이름") String name,
    @Schema(description = "동아리 짧은 설명") String shortDescription,
    @Schema(description = "동아리 상세 설명") String detailDescription,
    @Schema(description = "동아리 이미지 URL") String imageUrl,
    @Schema(description = "동아리 썸네일 URL") String thumbnailUrl,
    @Schema(description = "동아리 카테고리") Category category,
    @Schema(description = "동아리 태그 리스트") List<ClubTag> clubTags,
    @Schema(description = "동아리 요약 리스트") List<ClubSummary> clubSummaries,
    @Schema(description = "동아리 상세 이미지 리스트") List<ClubDetailImage> clubDetailImages) {}
