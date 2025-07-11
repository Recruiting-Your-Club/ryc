package com.ryc.api.v2.applicant.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;

public interface ApplicantJpaRepository extends JpaRepository<ApplicantEntity, String> {}
