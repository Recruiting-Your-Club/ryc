package com.ryc.api.v2.interview.infra.jpa;

import java.util.Optional;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.interview.infra.entity.InterviewReservationEntity;
import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;

public interface InterviewReservationJpaRepository
    extends JpaRepository<InterviewReservationEntity, String> {

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query(
      """
        select r.interviewSlot
        from InterviewReservationEntity r
        where r.applicant.id = :applicantId
    """)
  Optional<InterviewSlotEntity> findSlotByApplicantId(String applicantId);
}
