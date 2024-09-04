package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.evaluation.domain.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, String> {
    List<Evaluation> findByStepId(String stepId);

    List<Evaluation> findByStepIdAndApplicantId(String stepId, String applicantId);
}
