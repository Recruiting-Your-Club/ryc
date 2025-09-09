package com.ryc.api.v2.interview.domain;

import java.util.List;
import java.util.Optional;

public interface InterviewRepository {

  /*
   * 인터뷰 슬롯을 저장합니다.
   * @param interviewSlot 저장할 인터뷰 슬롯
   * interviewSlot의 List<InterviewReservation> 필드 또한 함께 저장됩니다.
   */
  InterviewSlot saveSlot(InterviewSlot interviewSlot);

  List<InterviewSlot> saveAllSlot(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findSlotsByAnnouncementId(String announcementId);

  InterviewSlot findSlotById(String interviewSlotId);

  InterviewSlot findSlotByIdWithLock(String interviewSlotId);

  Optional<InterviewSlot> findSlotByApplicantIdWithLock(String applicantId);

  void deleteSlotsByAnnouncementId(String announcementId);

  void deleteReservationById(String reservationId);

  boolean existsReservationById(String reservationId);

  boolean existsSlotsByAnnouncementId(String announcementId);
}
