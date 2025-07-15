package com.ryc.api.v2.Interview.domain;

import java.time.LocalDate;
import java.util.List;

public interface InterviewRepository {

  List<InterviewSlot> saveAllInterviewSLot(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findInterviewSlotsByAnnouncementId(String announcementId);

  List<InterviewSlot> findInterviewSlotsByAnnouncementIdAndDate(
      String announcementId, LocalDate interviewDate);

  InterviewSlot findInterviewSlotByIdForUpdate(String interviewSlotId);

  InterviewReservation saveInterviewReservation(
      InterviewReservation reservation, InterviewSlot slot);
}
