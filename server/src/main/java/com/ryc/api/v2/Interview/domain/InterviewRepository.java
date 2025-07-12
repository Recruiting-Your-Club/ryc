package com.ryc.api.v2.Interview.domain;

import java.util.List;
import java.util.Optional;

public interface InterviewRepository {

  List<InterviewSlot> saveAllInterviewSLot(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findInterviewSlotByAnnouncementId(String announcementId);

  Optional<InterviewSlot> findInterviewSlotById(String interviewSlotId);

  List<InterviewReservation> findInterviewReservationsBySlotId(String interviewSlotId);

  InterviewReservation saveInterviewReservation(InterviewReservation interviewReservation);
}
