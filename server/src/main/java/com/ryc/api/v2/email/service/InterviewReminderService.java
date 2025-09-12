package com.ryc.api.v2.email.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.email.domain.InterviewReminderInfo;
import com.ryc.api.v2.email.domain.InterviewReminderQueue;
import com.ryc.api.v2.email.domain.InterviewReminderRepository;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.email.domain.event.InterviewReminderEvent;
import com.ryc.api.v2.email.presentation.dto.response.InterviewReminderUpdatedResponse;
import com.ryc.api.v2.interview.domain.InterviewSlot;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewReminderService {

  private final InterviewReminderRepository reminderRepository;
  private final AnnouncementRepository announcementRepository;
  private final ApplicationEventPublisher publisher;

  @Transactional
  public void createReminderSettings(String announcementId) {
    if (reminderRepository.existsByAnnouncementId(announcementId)) {
      return;
    }

    InterviewReminderInfo reminderSetting = InterviewReminderInfo.initialize(announcementId);
    reminderRepository.save(reminderSetting);
  }

  @Transactional
  public String addReminderQueue(InterviewSlot interviewSlot, String applicantEmail) {
    InterviewReminderInfo reminderInfo =
        reminderRepository.findByAnnouncementId(interviewSlot.getAnnouncementId());
    InterviewReminderInfo newReminderInfo =
        reminderInfo.addReminderQueue(interviewSlot, applicantEmail);
    return reminderRepository.save(newReminderInfo).getId();
  }

  @Transactional
  public InterviewReminderUpdatedResponse updateReminderSetting(
      String announcementId, int relativeHour) {
    InterviewReminderInfo reminderSetting = reminderRepository.findByAnnouncementId(announcementId);

    InterviewReminderInfo updatedReminderSetting = reminderSetting.changeRelativeHour(relativeHour);
    InterviewReminderInfo savedReminderSetting = reminderRepository.save(updatedReminderSetting);

    return new InterviewReminderUpdatedResponse(
        savedReminderSetting.getId(),
        savedReminderSetting.getAnnouncementId(),
        savedReminderSetting.getRelativeHour());
  }

  @Transactional
  public void deleteReminderSetting(String announcementId) {
    if (!reminderRepository.existsByAnnouncementId(announcementId)) {
      throw new NoSuchElementException(
          "No reminder setting found for announcementId: " + announcementId);
    }

    reminderRepository.deleteByAnnouncementId(announcementId);
  }

  @Scheduled(cron = "0 * * * * *")
  protected void sendInterviewReminders() {
    List<InterviewReminderInfo> reminderInfos =
        reminderRepository.findAllByStatus(EmailSentStatus.PENDING);

    for (InterviewReminderInfo reminderInfo : reminderInfos) {
      String clubName =
          announcementRepository.findClubNameByAnnouncementId(reminderInfo.getAnnouncementId());

      for (InterviewReminderQueue reminderQueue : reminderInfo.getReminderQueues()) {
        // 이메일 이벤트 발행
        publisher.publishEvent(
            InterviewReminderEvent.builder()
                .announcementId(reminderInfo.getAnnouncementId())
                .clubName(clubName)
                .relativeHour(reminderInfo.getRelativeHour())
                .interviewPeriod(reminderQueue.getInterviewSlot().getPeriod())
                .applicantEmail(reminderQueue.getApplicantEmail())
                .build());

        // 상태 변경
        reminderQueue.changeSentStatus();
      }
    }

    reminderRepository.saveAll(reminderInfos);
  }
}
