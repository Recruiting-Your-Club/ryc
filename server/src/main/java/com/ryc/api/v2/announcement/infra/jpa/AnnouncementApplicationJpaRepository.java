package com.ryc.api.v2.announcement.infra.jpa;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementApplicationJpaRepository extends JpaRepository<AnnouncementApplicationEntity, String> {
}
