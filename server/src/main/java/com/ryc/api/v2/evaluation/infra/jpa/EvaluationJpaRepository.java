package com.ryc.api.v2.evaluation.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.infra.entity.EvaluationEntity;

public interface EvaluationJpaRepository extends JpaRepository<EvaluationEntity, String> {
  @Query(
      """
    SELECT e
    FROM EvaluationEntity e
    WHERE e.applicantEntity.id IN :applicantIds
      AND e.type = :type
      AND e.deleted = false
    """)
  List<EvaluationEntity> findEvaluationsByApplicantIdsAndType(
      @Param("applicantIds") List<String> applicantIds, @Param("type") EvaluationType type);
}
