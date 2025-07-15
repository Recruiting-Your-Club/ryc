package com.ryc.api.v2.Interview.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.Interview.infra.entity.InterviewReservationEntity;
import com.ryc.api.v2.Interview.infra.entity.InterviewSlotEntity;

public interface InterviewReservationJpaRepository
    extends JpaRepository<InterviewReservationEntity, String> {

  @Query(
      """
SELECT r.interviewSlot FROM InterviewReservationEntity r WHERE r.id = :interviewReservationId
""")
  Optional<InterviewSlotEntity> findInterviewSlotById(String interviewReservationId);
}
