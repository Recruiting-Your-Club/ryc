package com.ryc.api.v2.email.service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.NoSuchElementException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.email.domain.InterviewReminderRepository;
import com.ryc.api.v2.email.domain.InterviewReminderSetting;
import com.ryc.api.v2.email.presentation.dto.response.InterviewReminderUpdatedResponse;

@Service
public class InterviewReminderService {

  private final String interviewNotificationHtmlTemplate;
  private final InterviewReminderRepository reminderRepository;

  public InterviewReminderService(
      ResourceLoader resourceLoader, InterviewReminderRepository reminderRepository)
      throws IOException {
    Resource resource =
        resourceLoader.getResource("classpath:templates/interview-notification.html");

    try (InputStream is = resource.getInputStream()) {
      this.interviewNotificationHtmlTemplate =
          new String(is.readAllBytes(), StandardCharsets.UTF_8);
    }

    this.reminderRepository = reminderRepository;
  }

  @Transactional
  public void createReminderSettings(String announcementId) {
    if (reminderRepository.existsReminderSettingByAnnouncementId(announcementId)) {
      return;
    }

    InterviewReminderSetting reminderSetting = InterviewReminderSetting.initialize(announcementId);
    reminderRepository.saveReminderSetting(reminderSetting);
  }

  @Transactional
  public InterviewReminderUpdatedResponse updateReminderSetting(
      String announcementId, int relativeHour) {
    InterviewReminderSetting reminderSetting =
        reminderRepository.findReminderSettingByAnnouncementId(announcementId);
    InterviewReminderSetting updatedReminderSetting =
        reminderSetting.updateRelativeHour(relativeHour);

    InterviewReminderSetting savedReminderSetting =
        reminderRepository.saveReminderSetting(updatedReminderSetting);
    return new InterviewReminderUpdatedResponse(
        savedReminderSetting.getId(),
        savedReminderSetting.getAnnouncementId(),
        savedReminderSetting.getRelativeHour());
  }

  @Transactional
  public void deleteReminderSetting(String announcementId) {
    if (!reminderRepository.existsReminderSettingByAnnouncementId(announcementId)) {
      throw new NoSuchElementException(
          "No reminder setting found for announcementId: " + announcementId);
    }

    reminderRepository.deleteReminderSettingByAnnouncementId(announcementId);
  }

  @Transactional
  public void pushReminderQueue() {
    /*
         String subject =
           String.format(
               "[%s 동아리 면접 일정 리마인드] %d시간 후에 면접이 예정되어있습니다.",
               event.clubName(), event.relativeTimeHour());
       String content =
           interviewNotificationHtmlTemplate
               .replace("${relativeTimeHour}", event.relativeTimeHour().toString())
               .replace("${clubName}", event.clubName())
               .replace(
                   "${interviewDate}",
    event.interviewPeriod().startDate().toLocalDate().toString())
               .replace("${startTime}",
    event.interviewPeriod().startDate().toLocalTime().toString())
               .replace("${endTime}", event.interviewPeriod().endDate().toLocalTime().toString());
    */
  }
}
