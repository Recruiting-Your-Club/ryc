package com.ryc.api.v2.Interview.infra.mapper;

import com.ryc.api.v2.Interview.domain.InterviewReservation;
import com.ryc.api.v2.Interview.infra.entity.InterviewReservationEntity;
import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.applicant.infra.mapper.ApplicantMapper;

public class InterviewReservationMapper {

  private InterviewReservationMapper() {
    // Prevent instantiation
  }

  public static InterviewReservation toDomain(InterviewReservationEntity entity) {
    Applicant applicant = ApplicantMapper.toDomain(entity.getApplicant());
    return InterviewReservation.builder()
        .id(entity.getId())
        .applicant(applicant)
        .interviewSlotId(entity.getInterviewSlotId())
        .build();
  }

  public static InterviewReservationEntity toEntity(InterviewReservation reservation) {
    ApplicantEntity applicant = ApplicantMapper.toEntity(reservation.getApplicant());
    return InterviewReservationEntity.builder()
        .id(reservation.getId())
        .applicant(applicant)
        .interviewSlotId(reservation.getInterviewSlotId())
        .build();
  }
}
