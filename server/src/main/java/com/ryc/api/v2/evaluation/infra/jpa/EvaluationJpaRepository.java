package com.ryc.api.v2.evaluation.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
    """)
  List<EvaluationEntity> findEvaluationsByApplicantIdsAndType(
      @Param("applicantIds") List<String> applicantIds, @Param("type") EvaluationType type);

  @Query(
      """
        SELECT e.applicantEntity.id
        FROM EvaluationEntity e
        WHERE e.adminEntity.id = :evaluatorId
          AND e.type = :type
          AND e.applicantEntity.id in :applicantIds
    """)
  List<String> findEvaluatedApplicantIds(
      @Param("evaluatorId") String evaluatorId,
      @Param("type") EvaluationType type,
      @Param("applicantIds") List<String> applicantIds);


  void deleteByApplicantEntityId(String applicantId);
}
