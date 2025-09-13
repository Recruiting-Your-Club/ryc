package com.ryc.api.v2.email.domain.event;

import java.util.List;

import com.ryc.api.v2.common.domain.Period;

import lombok.Builder;

@Builder
public record InterviewReminderEvent(
    String announcementId,
    String clubName,
    int reminderTime,
    Period interviewPeriod,
    List<String> applicantEmails) {

  @Override
  public List<String> applicantEmails() {
    return List.copyOf(applicantEmails);
  }
}
