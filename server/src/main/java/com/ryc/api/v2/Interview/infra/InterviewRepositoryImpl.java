package com.ryc.api.v2.Interview.infra;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.Interview.domain.InterviewRepository;
import com.ryc.api.v2.Interview.domain.InterviewSlot;

@Repository
public class InterviewRepositoryImpl implements InterviewRepository {
  @Override
  public String save(InterviewSlot interviewSlot) {
    return null;
  }
}
