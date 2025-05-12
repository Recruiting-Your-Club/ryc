package com.ryc.api.v2.club.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.club.infra.entity.ClubDetailImageEntity;

public interface ClubDetailImageJpaRepository extends JpaRepository<ClubDetailImageEntity, String> {
  @Query("SELECT c FROM ClubDetailImageEntity c WHERE c.clubEntity.id = :clubId")
  List<ClubDetailImageEntity> findByClubId(String clubId);
}
