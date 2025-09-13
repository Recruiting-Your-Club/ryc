package com.ryc.api.v2.interview.infra.mapper;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.applicant.infra.mapper.ApplicantMapper;
import com.ryc.api.v2.interview.domain.InterviewReservation;
import com.ryc.api.v2.interview.infra.entity.InterviewReservationEntity;
import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;

public class InterviewReservationMapper {

  private InterviewReservationMapper() {
    // Prevent instantiation
  }

  public static InterviewReservation toDomain(InterviewReservationEntity entity) {
    Applicant applicant = ApplicantMapper.toDomain(entity.getApplicant());
    return InterviewReservation.builder()
        .id(entity.getId())
        .applicant(applicant)
        .reminderStatus(entity.getReminderStatus())
        .build();
  }

  public static InterviewReservationEntity toEntity(
      InterviewReservation reservation, InterviewSlotEntity slotEntity) {
    ApplicantEntity applicant = ApplicantMapper.toEntity(reservation.getApplicant());

    return InterviewReservationEntity.builder()
        .id(reservation.getId())
        .applicant(applicant)
        .reminderStatus(reservation.getReminderStatus())
        .interviewSlot(slotEntity)
        .build();
  }
}
