package com.ryc.api.v2.email.domain.event;

import com.ryc.api.v2.common.domain.Period;

import lombok.Builder;

@Builder
public record InterviewNotificationEvent(
    Period interviewPeriod, Integer relativeTimeHour, String clubName, String recipientEmail) {}
