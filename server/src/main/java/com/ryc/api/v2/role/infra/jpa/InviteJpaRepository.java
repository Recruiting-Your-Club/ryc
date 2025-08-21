package com.ryc.api.v2.role.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.role.infra.entity.ClubInviteEntity;

public interface InviteJpaRepository extends JpaRepository<ClubInviteEntity, String> {

  Optional<ClubInviteEntity> findByClub_Id(String clubId);
}
