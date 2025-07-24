package com.ryc.api.v2.role.presentation.dto.response;

import lombok.Builder;

@Builder
public record AdminsGetResponse(
    String adminId, String name, String imageUrl, String thumbnailUrl, String role) {}
