package com.ryc.api.v2.Interview.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.Interview.domain.InterviewSlot;
import com.ryc.api.v2.Interview.presentation.dto.request.NumberOfPeopleByInterviewDateRequest;

@Service
public class InterviewService {

  @Transactional
  public void createInterviewSlot(
      String adminId, String announcementId, List<NumberOfPeopleByInterviewDateRequest> requests) {

    List<InterviewSlot> interviewSlots =
        requests.stream()
            .map(
                request ->
                    InterviewSlot.initialize(
                        adminId,
                        announcementId,
                        request.numberOfPeople(),
                        request.interviewPeriod()))
            .toList();
  }
}
