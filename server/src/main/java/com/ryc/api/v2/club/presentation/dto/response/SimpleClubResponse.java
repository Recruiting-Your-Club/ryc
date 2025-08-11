package com.ryc.api.v2.club.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record SimpleClubResponse(
    @Schema(description = "동아리 ID") String id,
    @Schema(description = "동아리 이름") String name,
    @Schema(description = "동아리 대표 이미지") FileGetResponse representativeImage,
    @Schema(description = "동아리 간단한 설명") String shortDescription,
    @Schema(description = "동아리 카테고리") Category category,
    @Schema(description = "동아리 태그 리스트") List<ClubTag> clubTags,
    @Schema(description = "동아리 공고 상태") AnnouncementStatus announcementStatus) {}
