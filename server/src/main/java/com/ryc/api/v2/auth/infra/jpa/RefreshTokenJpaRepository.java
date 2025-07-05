package com.ryc.api.v2.auth.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ryc.api.v2.auth.infra.entity.RefreshTokenEntity;

public interface RefreshTokenJpaRepository extends JpaRepository<RefreshTokenEntity, String> {
}
