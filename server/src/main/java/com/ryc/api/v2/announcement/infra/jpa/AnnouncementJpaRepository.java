package com.ryc.api.v2.announcement.infra.jpa;

import java.time.LocalDateTime;
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

  @Query(
      " select case when count(a) > 0 then true else false END "
          + "FROM AnnouncementEntity a "
          + "where a.clubEntity.id = :clubId "
          + "AND :now >= a.announcementPeriodInfoVO.applicationPeriodVO.startDate "
          + "AND :now <= a.announcementPeriodInfoVO.applicationPeriodVO.endDate ")
  boolean existsRecruitingAnnouncementByClubIdAndNow(
      @Param("clubId") String clubId, @Param("now") LocalDateTime now);

  @Query(
      " select case when count(a) > 0 then true else false END "
          + "FROM AnnouncementEntity a "
          + "where a.clubEntity.id = :clubId "
          + "AND :now <= a.announcementPeriodInfoVO.applicationPeriodVO.startDate ")
  boolean existsUpcomingAnnouncementByClubIdAndNow(
      @Param("clubId") String clubId, @Param("now") LocalDateTime now);
}
