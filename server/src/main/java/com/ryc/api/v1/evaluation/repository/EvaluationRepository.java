package com.ryc.api.v1.evaluation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.evaluation.domain.Evaluation;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, String> {
  List<Evaluation> findByStepId(String stepId);

  List<Evaluation> findAllByStepIdAndApplicantIdIn(String stepId, List<String> applicantIdList);
}
