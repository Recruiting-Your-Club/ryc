package com.ryc.api.v1.interview.repository;

import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.recruitment.domain.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, String> {
    List<Interview> findByStep(Step step);
    List<Interview> findByStepId(String stepId);
}
