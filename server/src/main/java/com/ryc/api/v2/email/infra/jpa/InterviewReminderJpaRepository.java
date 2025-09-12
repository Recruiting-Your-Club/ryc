package com.ryc.api.v2.email.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.email.infra.entity.InterviewReminderSettingEntity;

public interface InterviewReminderJpaRepository
    extends JpaRepository<InterviewReminderSettingEntity, String> {
  boolean existsByAnnouncementId(String announcementId);

  Optional<InterviewReminderSettingEntity> findByAnnouncementId(String announcementId);

  void deleteByAnnouncementId(String announcementId);
}
