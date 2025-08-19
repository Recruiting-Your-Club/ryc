package com.ryc.api.v2.role.presentation.dto.response;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

import lombok.Builder;

@Builder
public record AdminsGetResponse(
    String adminId, String name, FileGetResponse representativeImage, String role) {}
