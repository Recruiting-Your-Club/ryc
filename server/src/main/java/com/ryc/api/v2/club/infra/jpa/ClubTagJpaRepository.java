package com.ryc.api.v2.club.infra.jpa;

import com.ryc.api.v2.club.infra.entity.ClubTagEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubTagJpaRepository extends JpaRepository<ClubTagEntity, String> {
}
