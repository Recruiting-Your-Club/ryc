package com.ryc.api.v2.Interview.infra.jpa;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import jakarta.persistence.LockModeType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.Interview.infra.entity.InterviewSlotEntity;

public interface InterviewSlotJpaRepository extends JpaRepository<InterviewSlotEntity, String> {

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("SELECT s FROM InterviewSlotEntity s WHERE s.id = :id")
  Optional<InterviewSlotEntity> findByIdForUpdate(String id);

  List<InterviewSlotEntity> findByAnnouncementId(String announcementId);

  @Query(
      "SELECT s FROM InterviewSlotEntity s WHERE s.announcementId = :announcementId AND s.period.startDate = :interviewDate")
  List<InterviewSlotEntity> findByAnnouncementIdAndDate(
      String announcementId, LocalDate interviewDate);
}
