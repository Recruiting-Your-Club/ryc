package com.ryc.api.v2.role.presentation.dto.response;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ClubRoleGetResponse(
    @Schema(description = "사용자 ID") String adminId,
    @Schema(description = "사용자 이름") String adminName,
    @Schema(description = "사용자 프로필 이미지") FileGetResponse adminProfileImage,
    @Schema(
            description = "동아리 권한",
            allowableValues = {"OWNER", "MEMBER"})
        String role,
    @Schema(description = "동아리 가입 날짜와 시간") String joinedAt) {}
