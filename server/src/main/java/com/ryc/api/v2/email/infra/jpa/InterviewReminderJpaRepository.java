package com.ryc.api.v2.email.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.email.infra.entity.InterviewReminderInfoEntity;

public interface InterviewReminderJpaRepository
    extends JpaRepository<InterviewReminderInfoEntity, String> {
  boolean existsByAnnouncementId(String announcementId);

  Optional<InterviewReminderInfoEntity> findByAnnouncementId(String announcementId);

  void deleteByAnnouncementId(String announcementId);

  @Query(
      """
SELECT iri FROM InterviewReminderInfoEntity iri
JOIN InterviewReminderQueueEntity irq
ON iri.id = irq.reminderInfo.id
WHERE irq.status = :status
      """)
  List<InterviewReminderInfoEntity> findAllByStatus(EmailSentStatus status);
}
