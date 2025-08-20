package com.ryc.api.v2.role.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.role.infra.entity.InviteEntity;

public interface InviteJpaRepository extends JpaRepository<InviteEntity, String> {

  Optional<InviteEntity> findByClubId(String clubId);
}
