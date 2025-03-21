package com.ryc.api.v2.club.infra.jpa;

import com.ryc.api.v2.club.infra.entity.ClubEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubJpaRepository extends JpaRepository<ClubEntity, String> {
}
