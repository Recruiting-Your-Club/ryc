package com.ryc.api.v2.interview.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ryc.api.v2.interview.domain.NumberOfPeopleByInterviewDate;

@Service
public class InterviewService {

  public void createInterview(
      String adminId,
      String announcementId,
      List<NumberOfPeopleByInterviewDate> numberOfPeopleByInterviewDate) {}
}
