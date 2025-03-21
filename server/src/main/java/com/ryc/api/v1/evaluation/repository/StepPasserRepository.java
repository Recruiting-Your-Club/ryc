package com.ryc.api.v1.evaluation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.evaluation.domain.StepPasser;

@Repository
public interface StepPasserRepository extends JpaRepository<StepPasser, String> {
  List<StepPasser> findAllByStepId(String stepId);
}
