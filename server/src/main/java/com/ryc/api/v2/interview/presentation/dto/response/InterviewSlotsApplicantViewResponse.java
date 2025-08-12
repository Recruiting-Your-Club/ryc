package com.ryc.api.v2.interview.presentation.dto.response;

import java.util.Comparator;
import java.util.List;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

public record InterviewSlotsApplicantViewResponse(
    @Schema(description = "동아리 이름") String clubName,
    @Schema(description = "동아리 카테고리") String clubCategory,
    @Schema(description = "동아리 이미지 URL") String clubImageUrl,
    @Schema(description = "동아리 썸네일 이미지 URL") FileGetResponse representativeImage,
    @Schema(description = "모든 면접 슬롯 정보") List<InterviewSlotGetResponse> interviewSlots,
    @Schema(description = "신청자 이메일") String applicantEmail) {

  @Builder
  public InterviewSlotsApplicantViewResponse {
    if (interviewSlots != null) {
      interviewSlots =
          interviewSlots.stream()
              .sorted(Comparator.comparing(slot -> slot.period().startDate()))
              .toList();
    }
  }
}
