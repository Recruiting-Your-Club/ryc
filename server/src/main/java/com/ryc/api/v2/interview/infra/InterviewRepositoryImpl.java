package com.ryc.api.v2.interview.infra;

import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.interview.domain.InterviewRepository;
import com.ryc.api.v2.interview.domain.InterviewSlot;
import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;
import com.ryc.api.v2.interview.infra.jpa.InterviewReservationJpaRepository;
import com.ryc.api.v2.interview.infra.jpa.InterviewSlotJpaRepository;
import com.ryc.api.v2.interview.infra.mapper.InterviewSlotMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InterviewRepositoryImpl implements InterviewRepository {

  private final InterviewSlotJpaRepository interviewSlotJpaRepository;
  private final InterviewReservationJpaRepository interviewReservationJpaRepository;

  @Override
  public InterviewSlot saveInterviewSlot(InterviewSlot interviewSlot) {
    InterviewSlotEntity entity = InterviewSlotMapper.toEntity(interviewSlot);
    InterviewSlotEntity savedEntity = interviewSlotJpaRepository.save(entity);
    return InterviewSlotMapper.toDomain(savedEntity);
  }

  @Override
  public List<InterviewSlot> saveAllInterviewSlot(List<InterviewSlot> interviewSlots) {
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
  public InterviewSlot findInterviewSlotByIdForUpdate(String interviewSlotId) {
    InterviewSlotEntity entity =
        interviewSlotJpaRepository
            .findByIdForUpdate(interviewSlotId)
            .orElseThrow(() -> new EntityNotFoundException("Interview slot not found"));
    return InterviewSlotMapper.toDomain(entity);
  }

  @Override
  public InterviewSlot findInterviewSlotByReservationId(String interviewReservationId) {
    InterviewSlotEntity entity =
        interviewReservationJpaRepository
            .findInterviewSlotById(interviewReservationId)
            .orElseThrow(
                () ->
                    new EntityNotFoundException(
                        "Interview slot not found for reservation ID: " + interviewReservationId));
    return InterviewSlotMapper.toDomain(entity);
  }
}
