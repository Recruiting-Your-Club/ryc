package com.ryc.api.v2.Interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import com.ryc.api.v2.applicant.domain.Applicant;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class InterviewReservation {

  private final String id;
  private final Applicant applicant;
  private final String interviewSlotId;

  public static InterviewReservation initialize(Applicant applicant, String interviewSlotId) {
    return InterviewReservation.builder()
        .id(DEFAULT_INITIAL_ID)
        .applicant(applicant)
        .interviewSlotId(interviewSlotId)
        .build();
  }
}
