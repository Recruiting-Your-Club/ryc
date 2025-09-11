package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Builder
public class InterviewReminderSetting {

  private final String id;
  private final String announcementId;
  private final int relativeHour;

  public static InterviewReminderSetting initialize(String announcementId) {
    return InterviewReminderSetting.builder()
        .id(DEFAULT_INITIAL_ID)
        .announcementId(announcementId)
        .relativeHour(24)
        .build();
  }

  public InterviewReminderSetting updateRelativeHour(int relativeHour) {
    return InterviewReminderSetting.builder()
        .id(this.id)
        .announcementId(this.announcementId)
        .relativeHour(relativeHour)
        .build();
  }
}
