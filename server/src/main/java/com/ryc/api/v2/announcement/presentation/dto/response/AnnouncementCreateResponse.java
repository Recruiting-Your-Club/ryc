package com.ryc.api.v2.announcement.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AnnouncementCreateResponse(
    @Schema(description = "announcementId", example = "123e4567-e89b-12d3-a456-426614174000")
        String announcementId) {}
