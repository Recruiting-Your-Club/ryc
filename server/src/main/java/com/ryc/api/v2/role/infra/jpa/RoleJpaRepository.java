package com.ryc.api.v2.role.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.role.infra.entity.RoleEntity;

public interface RoleJpaRepository extends JpaRepository<RoleEntity, String> {}
