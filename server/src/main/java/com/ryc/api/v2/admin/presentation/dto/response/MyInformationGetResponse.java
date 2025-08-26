package com.ryc.api.v2.admin.presentation.dto.response;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record MyInformationGetResponse(
    @Schema(description = "나의 이름", example = "홍길동") String name,
    @Schema(description = "나의 이메일", example = "example@example.com") String email,
    @Schema(description = "나의 프로필 이미지") FileGetResponse representativeImage) {}
