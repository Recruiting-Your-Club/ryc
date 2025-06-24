package com.ryc.api.v2.club.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.club.infra.entity.RoleEntity;

public interface RoleJpaRepository extends JpaRepository<RoleEntity, String> {}
