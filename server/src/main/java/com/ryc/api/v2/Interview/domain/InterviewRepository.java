package com.ryc.api.v2.Interview.domain;

import java.util.List;

public interface InterviewRepository {

  List<InterviewSlot> saveAll(List<InterviewSlot> interviewSlots);

  List<InterviewSlot> findInterviewSlotByAnnouncementId(String announcementId);
}
