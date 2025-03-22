package com.ryc.api.v2.admin.infra.jpa;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminJpaRepository extends JpaRepository<AdminEntity, String> {
    boolean existsByEmail(String email);

    Optional<AdminEntity> findByEmail(String email);
}
