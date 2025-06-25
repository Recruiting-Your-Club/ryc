package com.ryc.api.v2.email.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.email.infra.entity.EmailEntity;

public interface EmailJpaRepository extends JpaRepository<EmailEntity, String> {}
