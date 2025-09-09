package com.ryc.api.v2.interview.infra.mapper;

import java.util.ArrayList;
import java.util.List;

import com.ryc.api.v2.common.domain.Period;
import com.ryc.api.v2.common.infra.mapper.PeriodMapper;
import com.ryc.api.v2.common.infra.vo.PeriodVO;
import com.ryc.api.v2.interview.domain.InterviewReservation;
import com.ryc.api.v2.interview.domain.InterviewSlot;
import com.ryc.api.v2.interview.infra.entity.InterviewReservationEntity;
import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;

public class InterviewSlotMapper {

  private InterviewSlotMapper() {
    // Private constructor to prevent instantiation
  }

  public static InterviewSlot toDomain(InterviewSlotEntity slotEntity) {
    List<InterviewReservation> reservations =
        slotEntity.getInterviewReservations().stream()
            .map(InterviewReservationMapper::toDomain)
            .toList();
    Period period = PeriodMapper.toDomain(slotEntity.getPeriod());

    return InterviewSlot.builder()
        .id(slotEntity.getId())
        .creatorId(slotEntity.getCreatorId())
        .announcementId(slotEntity.getAnnouncementId())
        .maxNumberOfPeople(slotEntity.getMaxNumberOfPeople())
        .period(period)
        .reservations(reservations)
        .build();
  }

  public static InterviewSlotEntity toEntity(InterviewSlot slot) {
    PeriodVO periodVO = PeriodMapper.toVO(slot.getPeriod());
    InterviewSlotEntity slotEntity =
        InterviewSlotEntity.builder()
            .id(slot.getId())
            .creatorId(slot.getCreatorId())
            .announcementId(slot.getAnnouncementId())
            .maxNumberOfPeople(slot.getMaxNumberOfPeople())
            .period(periodVO)
            .interviewReservations(new ArrayList<>())
            .build();

    for (InterviewReservation reservation : slot.getReservations()) {
      InterviewReservationEntity reservationEntity =
          InterviewReservationMapper.toEntity(reservation, slotEntity);
      slotEntity.addReservation(reservationEntity);
    }
    return slotEntity;
  }
}
