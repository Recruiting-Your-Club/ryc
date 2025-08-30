package com.ryc.api.v2.email.domain.event;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public record ApplicationSuccessEmailEvent(
    String announcementId,
    String announcementTitle,
    LocalDateTime submittedDate,
    String applicantEmail,
    String applicantName) {}
