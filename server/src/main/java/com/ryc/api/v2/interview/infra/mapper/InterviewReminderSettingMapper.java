package com.ryc.api.v2.interview.infra.mapper;

import com.ryc.api.v2.interview.domain.InterviewReminderSetting;
import com.ryc.api.v2.interview.infra.entity.InterviewReminderSettingEntity;

public class InterviewReminderSettingMapper {

  private InterviewReminderSettingMapper() {
    // private constructor to prevent instantiation
  }

  public static InterviewReminderSetting toDomain(InterviewReminderSettingEntity entity) {
    return InterviewReminderSetting.builder()
        .id(entity.getId())
        .announcementId(entity.getAnnouncementId())
        .relativeHour(entity.getRelativeHour())
        .build();
  }

  public static InterviewReminderSettingEntity toEntity(
      InterviewReminderSetting interviewReminderSetting) {
    return InterviewReminderSettingEntity.builder()
        .id(interviewReminderSetting.getId())
        .announcementId(interviewReminderSetting.getAnnouncementId())
        .relativeHour(interviewReminderSetting.getRelativeHour())
        .build();
  }
}
