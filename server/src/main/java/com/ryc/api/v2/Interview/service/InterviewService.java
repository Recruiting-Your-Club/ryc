package com.ryc.api.v2.Interview.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ryc.api.v2.Interview.presentation.dto.request.NumberOfPeopleByInterviewDateRequest;

@Service
public class InterviewService {

  public void createInterviewSlot(
      String adminId,
      String announcementId,
      List<NumberOfPeopleByInterviewDateRequest> numberOfPeopleByInterviewDateRequest) {}
}
