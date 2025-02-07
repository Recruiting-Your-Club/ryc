package com.ryc.api.v1.recruitment.repository;

import com.ryc.api.v1.recruitment.domain.Recruitment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentRepository extends JpaRepository<Recruitment, String> {
}
