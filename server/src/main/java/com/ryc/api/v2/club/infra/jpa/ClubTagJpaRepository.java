package com.ryc.api.v2.club.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public interface ClubTagJpaRepository extends JpaRepository<ClubTagEntity, String> {}
