package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.ClubTag;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AllClubGetResponse(
    @Schema(description = "동아리 ID") @NotBlank(message = "club id shouldn't be blank") String id,
    @Schema(description = "동아리 이름") @NotBlank(message = "club name shouldn't be blank") String name,
    @Schema(description = "동아리 간단한 설명")
        @NotBlank(message = "club short description shouldn't be blank")
        String shortDescription,
    @Schema(description = "동아리 이미지 URL") String imageUrl,
    @Schema(description = "동아리 썸네일 URL") String thumbnailUrl,
    @Schema(description = "동아리 카테고리") @NotNull(message = "club category shouldn't be null")
        Category category,
    @Schema(description = "동아리 태그 리스트") @NotNull(message = "club tag shouldn't be null")
        List<ClubTag> clubTags) {}
