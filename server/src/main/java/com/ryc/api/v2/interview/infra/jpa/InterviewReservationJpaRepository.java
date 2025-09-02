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

  @Query(
      """
    SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END
    FROM InterviewReservationEntity r
    WHERE r.interviewSlot.announcementId = :announcementId
    AND r.applicant.id = :applicantId
""")
  Boolean existsByAnnouncementIdAndApplicantId(String announcementId, String applicantId);

  Boolean existsByApplicantId(String applicantId);
}
