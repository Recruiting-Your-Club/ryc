package com.ryc.api.v2.club.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public interface ClubTagJpaRepository extends JpaRepository<ClubTagEntity, String> {

  @Query("SELECT ct FROM ClubTagEntity ct WHERE ct.clubEntity.id = :clubId")
  List<ClubTagEntity> findAllByClubId(String clubId);
}
