package com.ryc.api.v2.interview.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.email.domain.event.InterviewReminderEvent;
import com.ryc.api.v2.interview.domain.InterviewRepository;
import com.ryc.api.v2.interview.domain.InterviewSlot;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InterviewReminderService {

  private final InterviewRepository interviewRepository;
  private final AnnouncementRepository announcementRepository;
  private final ApplicationEventPublisher publisher;

  @Scheduled(cron = "0 */5 * * * *")
  @Transactional
  protected void reminder() {
    List<InterviewSlot> slots = interviewRepository.findSlotForReminder();
    List<InterviewSlot> updatedSlots = new ArrayList<>();

    for (InterviewSlot slot : slots) {
      String clubName =
          announcementRepository.findClubNameByAnnouncementId(slot.getAnnouncementId());
      List<String> applicantEmails =
          slot.getReservations().stream()
              .map(reservation -> reservation.getApplicant().getEmail())
              .toList();

      // 이메일 이벤트 발행
      publisher.publishEvent(
          InterviewReminderEvent.builder()
              .announcementId(slot.getAnnouncementId())
              .clubName(clubName)
              .reminderTime(slot.getReminderTime())
              .interviewPeriod(slot.getPeriod())
              .applicantEmails(applicantEmails)
              .build());

      // 상태 업데이트
      InterviewSlot updatedSlot = slot.changeReminderStatus(EmailSentStatus.SENT);
      updatedSlots.add(updatedSlot);
    }

    if (!updatedSlots.isEmpty()) {
      interviewRepository.saveAllSlot(updatedSlots);
    }
  }
}
