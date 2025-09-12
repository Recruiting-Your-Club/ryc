package com.ryc.api.v2.email.domain;

import java.util.List;

import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

public interface InterviewReminderRepository {

  InterviewReminderInfo save(InterviewReminderInfo interviewReminderInfo);

  List<InterviewReminderInfo> saveAll(List<InterviewReminderInfo> reminderInfos);

  boolean existsByAnnouncementId(String announcementId);

  InterviewReminderInfo findByAnnouncementId(String announcementId);

  void deleteByAnnouncementId(String announcementId);

  List<InterviewReminderInfo> findAllByStatus(EmailSentStatus status);
}
