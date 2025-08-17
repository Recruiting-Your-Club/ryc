package com.ryc.api.v2.announcement.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;

@Repository
public interface AnnouncementJpaRepository extends JpaRepository<AnnouncementEntity, String> {
  @Query("select a from AnnouncementEntity a where a.clubId = :clubId")
  List<AnnouncementEntity> findAllByClubId(@Param("clubId") String clubId);

  List<AnnouncementEntity> findAllByIsDeleted(Boolean isDeleted);

  @Query(
      "select new com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto(a.clubId,"
          + "case when sum(case when a.announcementStatus = com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus.RECRUITING then 1 else 0 end) > 0 then com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus.RECRUITING "
          + "when sum(case when a.announcementStatus = com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus.UPCOMING then 1 else 0 end) > 0 then com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus.UPCOMING "
          + "else com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus.CLOSED end) "
          + "from AnnouncementEntity a "
          + "group by a.clubId")
  List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds);

  @Query(
      "SELECT c.name FROM ClubEntity c JOIN AnnouncementEntity a ON c.id = a.clubId WHERE a.id = :announcementId")
  Optional<String> findClubNameByAnnouncementId(String announcementId);
}
