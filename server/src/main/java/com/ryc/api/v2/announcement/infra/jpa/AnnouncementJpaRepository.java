package com.ryc.api.v2.announcement.infra.jpa;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnnouncementJpaRepository extends JpaRepository<AnnouncementEntity, String> {
    @Query("select a from AnnouncementEntity a where a.clubEntity.id = :clubId")
    List<AnnouncementEntity> findAllByClubId(@Param("clubId") String clubId);
}
