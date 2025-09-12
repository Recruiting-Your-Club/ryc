package com.ryc.api.v2.email.domain;

public interface InterviewReminderRepository {

  InterviewReminderSetting saveReminderSetting(InterviewReminderSetting interviewReminderSetting);

  boolean existsReminderSettingByAnnouncementId(String announcementId);

  InterviewReminderSetting findReminderSettingByAnnouncementId(String announcementId);

  void deleteReminderSettingByAnnouncementId(String announcementId);
}
