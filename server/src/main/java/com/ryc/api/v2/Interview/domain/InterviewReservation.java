package com.ryc.api.v2.Interview.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = lombok.AccessLevel.PRIVATE)
public class InterviewReservation {

  private final String id;
  private final String applicantId;
  private final String interviewSlotId;

  public static InterviewReservation initialize(String applicantId, String interviewSlotId) {
    return InterviewReservation.builder()
        .id(DEFAULT_INITIAL_ID)
        .applicantId(applicantId)
        .interviewSlotId(interviewSlotId)
        .build();
  }
}
