package com.ryc.api.v2.email.domain.event;

import com.ryc.api.v2.common.domain.Period;

import lombok.Builder;

@Builder
public record InterviewReminderEvent(
    String announcementId,
    String clubName,
    int relativeHour,
    Period interviewPeriod,
    String applicantEmail) {}
