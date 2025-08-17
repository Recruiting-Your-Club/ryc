package com.ryc.api.v2.email.service.event;

import com.ryc.api.v2.announcement.domain.vo.Period;

import lombok.Builder;

@Builder
public record InterviewReservationEmailEvent(
    String clubName,
    String announcementId,
    String applicantName,
    String applicantEmail,
    Period period) {}
