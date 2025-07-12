package com.ryc.api.v2.Interview.infra;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.Interview.domain.InterviewRepository;
import com.ryc.api.v2.Interview.domain.InterviewSlot;
import com.ryc.api.v2.Interview.infra.entity.InterviewSlotEntity;
import com.ryc.api.v2.Interview.infra.jpa.InterviewSlotJpaRepository;
import com.ryc.api.v2.Interview.infra.mapper.InterviewSlotMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class InterviewRepositoryImpl implements InterviewRepository {

  private final InterviewSlotJpaRepository interviewSlotJpaRepository;

  @Override
  public List<InterviewSlot> saveAll(List<InterviewSlot> interviewSlots) {
    List<InterviewSlotEntity> entities =
        interviewSlots.stream().map(InterviewSlotMapper::toEntity).toList();
    List<InterviewSlotEntity> savedEntities = interviewSlotJpaRepository.saveAll(entities);
    return savedEntities.stream().map(InterviewSlotMapper::toDomain).toList();
  }
}
