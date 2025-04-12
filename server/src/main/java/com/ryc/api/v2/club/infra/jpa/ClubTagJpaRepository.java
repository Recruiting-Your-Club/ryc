package com.ryc.api.v2.club.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.club.infra.entity.ClubTagEntity;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ClubTagJpaRepository extends JpaRepository<ClubTagEntity, String> {

    @Query("SELECT ct FROM ClubTagEntity ct WHERE ct.clubEntity.id = :clubId")
    List<ClubTagEntity> findAllByClubId(String clubId);
}
