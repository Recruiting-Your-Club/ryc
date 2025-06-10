package com.ryc.api.v2.announcement.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;

public interface AnnouncementJpaRepository extends JpaRepository<AnnouncementEntity, String> {
  @Query("select a from AnnouncementEntity a where a.clubEntity.id = :clubId")
  List<AnnouncementEntity> findAllByClubId(@Param("clubId") String clubId);

  Optional<AnnouncementEntity> findById(String id);

  List<AnnouncementEntity> findAllByIsDeleted(Boolean isDeleted);
}
