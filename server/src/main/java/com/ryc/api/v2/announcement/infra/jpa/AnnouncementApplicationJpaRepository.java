package com.ryc.api.v2.announcement.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;

public interface AnnouncementApplicationJpaRepository
    extends JpaRepository<AnnouncementApplicationEntity, String> {

  Optional<AnnouncementApplicationEntity> findById(String id);

  Optional<AnnouncementApplicationEntity> findByAnnouncementEntityId(String announcementId);
}
