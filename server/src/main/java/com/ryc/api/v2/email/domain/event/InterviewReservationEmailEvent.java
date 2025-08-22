package com.ryc.api.v2.email.domain.event;

import com.ryc.api.v2.common.domain.Period;

import lombok.Builder;

@Builder
public record InterviewReservationEmailEvent(
    String clubName,
    String announcementId,
    String applicantName,
    String applicantEmail,
    Period period) {}
