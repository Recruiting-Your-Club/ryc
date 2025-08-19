package com.ryc.api.v2.role.presentation.dto.response;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

import lombok.Builder;

@Builder
public record ClubRoleGetResponse(
    String adminId, String adminName, String role, FileGetResponse fileGetResponse) {}
