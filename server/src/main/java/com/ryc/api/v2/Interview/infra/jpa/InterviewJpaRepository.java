package com.ryc.api.v2.Interview.infra.jpa;

import com.ryc.api.v2.Interview.infra.entity.InterviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewJpaRepository extends JpaRepository<InterviewEntity, String> {
}
