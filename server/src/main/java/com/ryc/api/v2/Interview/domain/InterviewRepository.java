package com.ryc.api.v2.Interview.domain;

import java.util.List;

public interface InterviewRepository {

  List<String> saveAll(List<InterviewSlot> interviewSlots);
}
