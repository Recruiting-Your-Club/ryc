package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.domain.vo.ClubSummary;
import com.ryc.api.v2.club.domain.vo.ClubTag;
import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubGetResponse(
    @Schema(description = "동아리 이름") String name,
    @Schema(description = "동아리 상세 설명") String detailDescription,
    @Schema(description = "동아리 대표 이미지") FileGetResponse representativeImage,
    @Schema(description = "동아리 카테고리") Category category,
    @Schema(description = "동아리 태그 리스트") List<ClubTag> clubTags,
    @Schema(description = "동아리 요약 리스트") List<ClubSummary> clubSummaries,
    @Schema(description = "동아리 상세 이미지 리스트") List<FileGetResponse> clubDetailImages) {}
