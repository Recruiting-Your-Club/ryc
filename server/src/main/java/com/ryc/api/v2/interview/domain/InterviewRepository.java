package com.ryc.api.v2.interview.domain;

import java.util.List;

public interface InterviewRepository {

  /*
   * 인터뷰 슬롯을 저장합니다.
   * @param interviewSlot 저장할 인터뷰 슬롯
   * interviewSlot의 List<InterviewReservation> 필드 또한 함께 저장됩니다.
   */
  InterviewSlot saveInterviewSlot(InterviewSlot interviewSlot);

  List<InterviewSlot> saveAllInterviewSlot(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findInterviewSlotsByAnnouncementId(String announcementId);

  InterviewSlot findInterviewSlotById(String interviewSlotId);

  InterviewSlot findInterviewSlotByIdForUpdate(String interviewSlotId);

  InterviewSlot findInterviewSlotByReservationId(String interviewReservationId);
}
