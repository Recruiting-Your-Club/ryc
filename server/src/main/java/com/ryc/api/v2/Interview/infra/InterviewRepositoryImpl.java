package com.ryc.api.v2.Interview.infra;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.Interview.domain.InterviewRepository;
import com.ryc.api.v2.Interview.domain.InterviewReservation;
import com.ryc.api.v2.Interview.domain.InterviewSlot;
import com.ryc.api.v2.Interview.infra.entity.InterviewReservationEntity;
import com.ryc.api.v2.Interview.infra.entity.InterviewSlotEntity;
import com.ryc.api.v2.Interview.infra.jpa.InterviewReservationJpaRepository;
import com.ryc.api.v2.Interview.infra.jpa.InterviewSlotJpaRepository;
import com.ryc.api.v2.Interview.infra.mapper.InterviewReservationMapper;
import com.ryc.api.v2.Interview.infra.mapper.InterviewSlotMapper;
import com.ryc.api.v2.common.exception.code.InterviewErrorCode;
import com.ryc.api.v2.common.exception.custom.InterviewException;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InterviewRepositoryImpl implements InterviewRepository {

  private final InterviewSlotJpaRepository interviewSlotJpaRepository;
  private final InterviewReservationJpaRepository interviewReservationJpaRepository;

  @Override
  public List<InterviewSlot> saveAllInterviewSLot(List<InterviewSlot> interviewSlots) {
    List<InterviewSlotEntity> entities =
        interviewSlots.stream().map(InterviewSlotMapper::toEntity).toList();
    List<InterviewSlotEntity> savedEntities = interviewSlotJpaRepository.saveAll(entities);
    return savedEntities.stream().map(InterviewSlotMapper::toDomain).toList();
  }

  @Override
  public List<InterviewSlot> findInterviewSlotsByAnnouncementId(String announcementId) {
    List<InterviewSlotEntity> entities =
        interviewSlotJpaRepository.findByAnnouncementId(announcementId);
    return entities.stream().map(InterviewSlotMapper::toDomain).toList();
  }

  @Override
  public List<InterviewSlot> findInterviewSlotsByAnnouncementIdAndDate(
      String announcementId, LocalDate interviewDate) {
    List<InterviewSlotEntity> entities =
        interviewSlotJpaRepository.findByAnnouncementIdAndDate(announcementId, interviewDate);
    return entities.stream().map(InterviewSlotMapper::toDomain).toList();
  }

  @Override
  public InterviewSlot findInterviewSlotByIdForUpdate(String interviewSlotId) {
    InterviewSlotEntity entity =
        interviewSlotJpaRepository
            .findByIdForUpdate(interviewSlotId)
            .orElseThrow(() -> new InterviewException(InterviewErrorCode.INTERVIEW_SLOT_NOT_FOUND));
    return InterviewSlotMapper.toDomain(entity);
  }

  @Override
  public InterviewReservation saveInterviewReservation(
      InterviewReservation reservation, InterviewSlot slot) {
    InterviewSlotEntity slotEntity = InterviewSlotMapper.toEntity(slot);
    InterviewReservationEntity entity =
        InterviewReservationMapper.toEntity(reservation, slotEntity);
    InterviewReservationEntity savedEntity = interviewReservationJpaRepository.save(entity);
    return InterviewReservationMapper.toDomain(savedEntity);
  }
}
