package com.ryc.api.v1.evaluation.repository;

import com.ryc.api.v1.evaluation.domain.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, String> {
}
