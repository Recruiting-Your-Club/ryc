package com.ryc.api.v1.recruitment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.recruitment.domain.Recruitment;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment, String> {}
