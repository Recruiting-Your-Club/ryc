package com.ryc.api.v2.Interview.presentation.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record InterviewSlotGetAllResponse(
    @Schema(description = "동아리 이름") String clubName,
    @Schema(description = "동아리 카테고리") String clubCategory,
    @Schema(description = "동아리 이미지 URL") String clubImageUrl,
    @Schema(description = "동아리 썸네일 이미지 URL") String clubThumbnailUrl,
    @Schema(description = "모든 면접 슬롯 정보") List<InterviewSlotGetResponse> interviewSlots,
    @Schema(description = "신청자 이메일") String applicantEmail) {}
