package com.ryc.api.v2.email.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.interview.domain.InterviewSlot;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Builder
public class InterviewReminderInfo {

  private final String id;
  private final String announcementId;
  private final int relativeHour;
  @Builder.Default private final List<InterviewReminderQueue> reminderQueues = List.of();

  public static InterviewReminderInfo initialize(String announcementId) {
    return InterviewReminderInfo.builder()
        .id(DEFAULT_INITIAL_ID)
        .announcementId(announcementId)
        .relativeHour(24)
        .reminderQueues(List.of())
        .build();
  }

  public InterviewReminderInfo addReminderQueue(
      InterviewSlot interviewSlot, String applicantEmail) {
    List<InterviewReminderQueue> newReminderQueues = new ArrayList<>(this.reminderQueues);
    newReminderQueues.add(
        InterviewReminderQueue.initialize(relativeHour, applicantEmail, interviewSlot));

    return InterviewReminderInfo.builder()
        .id(this.id)
        .announcementId(this.announcementId)
        .relativeHour(this.relativeHour)
        .reminderQueues(List.copyOf(newReminderQueues))
        .build();
  }

  public InterviewReminderInfo changeRelativeHour(int relativeHour) {
    if (relativeHour < 0) {
      throw new IllegalArgumentException("면접 알림 시간은 0 이상이어야 합니다.");
    }

    List<InterviewReminderQueue> newReminderQueue =
        reminderQueues.stream()
            .map(reminder -> reminder.changeReminderDateTime(relativeHour))
            .toList();

    return InterviewReminderInfo.builder()
        .id(this.id)
        .announcementId(this.announcementId)
        .relativeHour(relativeHour)
        .reminderQueues(newReminderQueue)
        .build();
  }
}
