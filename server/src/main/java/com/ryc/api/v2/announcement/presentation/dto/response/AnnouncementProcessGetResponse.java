package com.ryc.api.v2.announcement.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementProcess;

import io.swagger.v3.oas.annotations.media.Schema;

public record AnnouncementProcessGetResponse(
    @Schema(description = "해당 공고에 포함된 단계 리스트", example = "[\"DOCUMENT\", \"INTERVIEW\", \"FINAL\"]")
        List<AnnouncementProcess> processes) {}
