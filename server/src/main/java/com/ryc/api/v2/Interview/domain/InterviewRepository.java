package com.ryc.api.v2.Interview.domain;

import java.util.List;

public interface InterviewRepository {

  List<InterviewSlot> saveAllInterviewSLot(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findInterviewSlotByAnnouncementId(String announcementId);

  InterviewSlot findInterviewSlotByIdForUpdate(String interviewSlotId);

  Integer countInterviewReservationBySlotId(String interviewSlotId);

  InterviewReservation saveInterviewReservation(InterviewReservation interviewReservation);
}
