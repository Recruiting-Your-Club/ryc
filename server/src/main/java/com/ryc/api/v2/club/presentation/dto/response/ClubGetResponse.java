package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubGetResponse(
    @Schema(description = "동아리 ID", example = "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d") @NotBlank
        String id,
    @Schema(description = "동아리 이름", example = "엔샵") @NotBlank String name,
    @Schema(description = "동아리 설명", example = "엔샵 동아리로 말할 것 같으면 GOOD!") @NotNull
        String detailDescription,
    @Schema(description = "동아리 이미지 URL", example = "https://example.com/image.png") String imageUrl,
    @Schema(description = "동아리 썸네일 URL", example = "https://example.com/thumbnail.png")
        String thumbnailUrl,
    @Schema(description = "동아리 카테고리", example = "ACADEMIC") @NotNull Category category,
    @Schema(description = "동아리 태그 리스트", example = "[\"코딩\", \"AI\"]") List<ClubTag> clubTags,
    @Schema(description = "동아리 요약 리스트") List<ClubSummary> clubSummaries) {}
