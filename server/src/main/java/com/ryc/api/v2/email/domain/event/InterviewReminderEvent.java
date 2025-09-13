package com.ryc.api.v2.email.domain.event;

import com.ryc.api.v2.common.domain.Period;

import lombok.Builder;

import java.util.List;

@Builder
public record InterviewReminderEvent(
    String announcementId,
    String clubName,
    int reminderTime,
    Period interviewPeriod,
    List<String> applicantEmails) {}
