package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.domain.vo.ClubDetailImage;
import com.ryc.api.v2.club.domain.vo.ClubSummary;
import com.ryc.api.v2.club.domain.vo.ClubTag;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubGetResponse(
    @Schema(description = "동아리 이름") @NotBlank(message = "club name shouldn't be blank") String name,
    @Schema(description = "동아리 상세 설명") String detailDescription,
    @Schema(description = "동아리 이미지 URL") String imageUrl,
    @Schema(description = "동아리 썸네일 URL") String thumbnailUrl,
    @Schema(description = "동아리 카테고리") @NotNull(message = "club category shouldn't be null")
        Category category,
    @Schema(description = "동아리 태그 리스트") @NotNull(message = "club tags shouldn't be null")
        List<ClubTag> clubTags,
    @Schema(description = "동아리 요약 리스트") @NotNull(message = "club summaries shouldn't be null")
        List<ClubSummary> clubSummaries,
    @Schema(description = "동아리 상세 이미지 리스트")
        @NotNull(message = "club detail images shouldn't be null")
        List<ClubDetailImage> clubDetailImages) {}
