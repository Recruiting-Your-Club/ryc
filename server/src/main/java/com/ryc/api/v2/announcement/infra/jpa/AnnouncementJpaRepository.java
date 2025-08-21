package com.ryc.api.v2.announcement.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;

@Repository
public interface AnnouncementJpaRepository extends JpaRepository<AnnouncementEntity, String> {

  @Query("select a from AnnouncementEntity a where a.clubId = :clubId and a.isDeleted = false")
  List<AnnouncementEntity> findAllByClubId(@Param("clubId") String clubId);

  @Query(
      "SELECT c.name FROM ClubEntity c JOIN AnnouncementEntity a ON c.id = a.clubId WHERE a.id = :announcementId")
  Optional<String> findClubNameByAnnouncementId(String announcementId);

  @Query("SELECT a.id FROM AnnouncementEntity a WHERE a.clubId = :clubId AND a.isDeleted = false")
  List<String> findIdsByClubId(String clubId);

  @Query(
      "SELECT a FROM AnnouncementEntity a WHERE a.id IN :announcementIds AND a.isDeleted = false")
  List<AnnouncementEntity> findAllByIdIn(List<String> announcementIds);

  @Query("SELECT a FROM AnnouncementEntity a WHERE a.clubId IN :clubIds AND a.isDeleted = false")
  List<AnnouncementEntity> findAllByClubIdIn(List<String> clubIds);
}
