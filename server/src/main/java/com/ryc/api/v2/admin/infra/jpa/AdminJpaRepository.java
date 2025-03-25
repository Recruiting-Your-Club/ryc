package com.ryc.api.v2.admin.infra.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;

public interface AdminJpaRepository extends JpaRepository<AdminEntity, String> {
  boolean existsByEmail(String email);

  Optional<AdminEntity> findByEmail(String email);
}
