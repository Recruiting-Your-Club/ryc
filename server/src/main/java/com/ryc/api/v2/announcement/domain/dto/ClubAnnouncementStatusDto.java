package com.ryc.api.v2.announcement.domain.dto;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;

public record ClubAnnouncementStatusDto(String clubId, AnnouncementStatus status) {}
