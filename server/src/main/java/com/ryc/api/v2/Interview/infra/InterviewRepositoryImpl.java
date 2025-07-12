package com.ryc.api.v2.Interview.infra;

import java.util.List;
import java.util.Optional;

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
  public List<InterviewSlot> findInterviewSlotByAnnouncementId(String announcementId) {
    List<InterviewSlotEntity> entities =
        interviewSlotJpaRepository.findByAnnouncementId(announcementId);
    return entities.stream().map(InterviewSlotMapper::toDomain).toList();
  }

  @Override
  public Optional<InterviewSlot> findInterviewSlotById(String interviewSlotId) {
    Optional<InterviewSlotEntity> entity = interviewSlotJpaRepository.findById(interviewSlotId);
    return entity.map(InterviewSlotMapper::toDomain);
  }

  @Override
  public List<InterviewReservation> findInterviewReservationsBySlotId(String interviewSlotId) {
    List<InterviewReservationEntity> entities =
        interviewReservationJpaRepository.findByInterviewSlotId(interviewSlotId);
    return entities.stream().map(InterviewReservationMapper::toDomain).toList();
  }

  @Override
  public InterviewReservation saveInterviewReservation(InterviewReservation interviewReservation) {
    InterviewReservationEntity entity = InterviewReservationMapper.toEntity(interviewReservation);
    InterviewReservationEntity savedEntity = interviewReservationJpaRepository.save(entity);
    return InterviewReservationMapper.toDomain(savedEntity);
  }
}
