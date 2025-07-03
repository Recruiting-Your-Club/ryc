package com.ryc.api.v2.club.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.club.infra.entity.ClubEntity;

public interface ClubJpaRepository extends JpaRepository<ClubEntity, String> {
  boolean existsByName(String name);
}
