package com.ryc.api.v2.club.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;

public interface ClubSummaryJpaRepository extends JpaRepository<ClubSummaryEntity, String> {
  @Query("SELECT cs FROM ClubSummaryEntity cs WHERE cs.clubEntity.id = :clubId")
  List<ClubSummaryEntity> findByClubId(String clubId);
}
