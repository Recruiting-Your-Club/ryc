package com.ryc.api.v2.evaluation.infra.mapper;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.evaluation.domain.Evaluation;
import com.ryc.api.v2.evaluation.infra.entity.EvaluationEntity;

public class EvaluationMapper {
  private EvaluationMapper() {}

  public static EvaluationEntity toEntity(
      Evaluation evaluation, AdminEntity adminEntity, ApplicantEntity applicantEntity) {
    return EvaluationEntity.builder()
        .id(evaluation.getId())
        .adminEntity(adminEntity)
        .applicantEntity(applicantEntity)
        .score(evaluation.getScore())
        .comment(evaluation.getComment())
        .type(evaluation.getType())
        .deleted(evaluation.getDeleted())
        .build();
  }

  public static Evaluation toDomain(EvaluationEntity evaluationEntity) {
    return Evaluation.builder()
        .id(evaluationEntity.getId())
        .evaluatorId(evaluationEntity.getAdminEntity().getId())
        .evaluateeId(evaluationEntity.getApplicantEntity().getId())
        .score(evaluationEntity.getScore())
        .comment(evaluationEntity.getComment())
        .type(evaluationEntity.getType())
        .deleted(evaluationEntity.getDeleted())
        .build();
  }
}
