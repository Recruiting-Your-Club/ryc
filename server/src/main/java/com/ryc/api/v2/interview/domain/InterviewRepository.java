package com.ryc.api.v2.interview.domain;

import java.util.List;

public interface InterviewRepository {

  InterviewSlot saveInterviewSlot(InterviewSlot interviewSlot);

  List<InterviewSlot> saveAllInterviewSlot(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findInterviewSlotsByAnnouncementId(String announcementId);

  InterviewSlot findInterviewSlotByIdForUpdate(String interviewSlotId);

  InterviewSlot findInterviewSlotByReservationId(String interviewReservationId);

  InterviewReservation saveInterviewReservation(
      InterviewReservation reservation, InterviewSlot slot);
}
