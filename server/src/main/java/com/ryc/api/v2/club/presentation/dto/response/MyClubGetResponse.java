package com.ryc.api.v2.club.presentation.dto.response;

import lombok.Builder;

@Builder
public record MyClubGetResponse(
    String id, String name, String shortDescription, String imageUrl, String thumbnailUrl) {}
