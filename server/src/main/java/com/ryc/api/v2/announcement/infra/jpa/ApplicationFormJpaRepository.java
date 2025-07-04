package com.ryc.api.v2.announcement.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.announcement.infra.entity.ApplicationFormEntity;

public interface ApplicationFormJpaRepository extends JpaRepository<ApplicationFormEntity, String> {

  Optional<ApplicationFormEntity> findByAnnouncementId(String announcementId);
}
