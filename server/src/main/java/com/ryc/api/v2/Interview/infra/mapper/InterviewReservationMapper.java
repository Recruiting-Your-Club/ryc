package com.ryc.api.v2.Interview.infra.mapper;

import com.ryc.api.v2.Interview.domain.InterviewReservation;
import com.ryc.api.v2.Interview.infra.entity.InterviewReservationEntity;

public class InterviewReservationMapper {

  private InterviewReservationMapper() {
    // Prevent instantiation
  }

  public static InterviewReservation toDomain(InterviewReservationEntity entity) {
    return InterviewReservation.builder()
        .id(entity.getId())
        .applicantId(entity.getApplicantId())
        .interviewSlotId(entity.getInterviewSlotId())
        .build();
  }

  public static InterviewReservationEntity toEntity(InterviewReservation reservation) {
    return InterviewReservationEntity.builder()
        .id(reservation.getId())
        .applicantId(reservation.getApplicantId())
        .interviewSlotId(reservation.getInterviewSlotId())
        .build();
  }
}
