package com.ryc.api.v2.interview.presentation.dto.response;

import com.ryc.api.v2.common.dto.response.FileGetResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record UnReservedApplicantGetResponse(
        @Schema(description = "지원자 ID") String applicantId,
        @Schema(description = "지원자 이메일") String applicantEmail,
        @Schema(description = "지원자 이름") String applicantName,
        @Schema(description = "대표 이미지") FileGetResponse representativeImage,
        @Schema(description = "지원자 이미지 존재 여부") Boolean imagePresent) {}
