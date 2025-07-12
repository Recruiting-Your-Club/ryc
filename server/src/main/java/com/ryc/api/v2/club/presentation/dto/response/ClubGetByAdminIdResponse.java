package com.ryc.api.v2.club.presentation.dto.response;

import lombok.Builder;

@Builder
public record ClubGetByAdminIdResponse(
    String id, String name, String shortDescription, String imageUrl, String thumbnailUrl) {}
