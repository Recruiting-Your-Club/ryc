package com.ryc.api.v2.club.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.club.infra.entity.ClubEntity;

public interface ClubJpaRepository extends JpaRepository<ClubEntity, String> {

  @Query(
      "SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM ClubEntity c WHERE c.name = ?1 AND c.isDeleted = false")
  boolean existsByName(String name);

  @Query(
      "SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM ClubEntity c WHERE c.id = ?1 AND c.isDeleted = false")
  boolean existsById(String clubId);
}
