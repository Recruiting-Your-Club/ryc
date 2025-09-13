package com.ryc.api.v2.interview.infra.jpa;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;

public interface InterviewSlotJpaRepository extends JpaRepository<InterviewSlotEntity, String> {

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("SELECT s FROM InterviewSlotEntity s WHERE s.id = :id")
  Optional<InterviewSlotEntity> findByIdWithLock(String id);

  List<InterviewSlotEntity> findByAnnouncementId(String announcementId);

  void deleteAllByAnnouncementId(String announcementId);

  boolean existsByAnnouncementId(String announcementId);

  /*
   * 인터뷰 시작 시간 기준으로, 현재 시간부터 reminder_time 시간 이내에 시작하는 인터뷰 슬롯을 조회
   * reminder_time이 null인 경우는 제외
   * reminder_status가 'PENDING'인 경우만 조회
   * start_date가 현재 시간보다 이후인 경우만 조회 (과거 인터뷰 슬롯 제외)
   */
  @Query(
      value =
          """
    SELECT * FROM interview_slots AS s
    WHERE s.reminder_time IS NOT NULL
    AND s.reminder_status = 'PENDING'
    AND s.start_date > NOW()
    AND s.start_date <= DATE_ADD(NOW(), INTERVAL s.reminder_time HOUR)
    """,
      nativeQuery = true)
  List<InterviewSlotEntity> findSlotsForReminder();
}
