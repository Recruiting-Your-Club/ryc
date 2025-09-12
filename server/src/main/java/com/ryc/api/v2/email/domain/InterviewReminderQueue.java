package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.interview.domain.InterviewSlot;

import lombok.Builder;
import lombok.Getter;

@Getter
public class InterviewReminderQueue {

  private final String id;
  private final String applicantEmail;
  private EmailSentStatus status;
  private final LocalDateTime reminderDateTime;

  private final InterviewSlot interviewSlot;

  @Builder
  public InterviewReminderQueue(
      String id,
      String applicantEmail,
      LocalDateTime reminderDateTime,
      EmailSentStatus status,
      InterviewSlot interviewSlot) {
    this.id = id;
    this.applicantEmail = applicantEmail;
    this.status = status;
    this.reminderDateTime = reminderDateTime;
    this.interviewSlot = interviewSlot;
  }

  public static InterviewReminderQueue initialize(
      int relativeTime, String applicantEmail, InterviewSlot interviewSlot) {
    LocalDateTime reminderDateTime = interviewSlot.getPeriod().startDate().minusHours(relativeTime);

    return InterviewReminderQueue.builder()
        .id(DEFAULT_INITIAL_ID)
        .applicantEmail(applicantEmail)
        .reminderDateTime(reminderDateTime)
        .status(EmailSentStatus.PENDING)
        .interviewSlot(interviewSlot)
        .build();
  }

  public InterviewReminderQueue changeReminderDateTime(int relativeTime) {
    if (status != EmailSentStatus.PENDING) {
      return this;
    }

    LocalDateTime reminderDateTime = interviewSlot.getPeriod().startDate().minusHours(relativeTime);

    return InterviewReminderQueue.builder()
        .id(this.id)
        .applicantEmail(this.applicantEmail)
        .reminderDateTime(reminderDateTime)
        .status(this.status)
        .interviewSlot(this.interviewSlot)
        .build();
  }

  public void changeSentStatus() {
    this.status = EmailSentStatus.PENDING;
  }
}
