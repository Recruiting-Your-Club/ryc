package com.ryc.api.v2.email.presentation.dto.response;

public record InterviewReminderUpdatedResponse(
    String interviewReminderSettingId, String announcementId, int reminderRelativeHour) {}
