package com.ryc.api.v2.announcement.infra.jpa;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementJpaRepository extends JpaRepository<AnnouncementEntity, String> {
}
