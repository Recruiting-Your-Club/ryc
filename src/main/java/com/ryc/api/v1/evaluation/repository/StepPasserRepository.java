package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.evaluation.domain.StepPasser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StepPasserRepository extends JpaRepository<StepPasser, String> {
    List<StepPasser> findAllByStepId(String stepId);
}
