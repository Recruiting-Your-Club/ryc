package com.ryc.api.v2.evaluation.infra;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.applicant.infra.jpa.ApplicantJpaRepository;
import com.ryc.api.v2.evaluation.domain.Evaluation;
import com.ryc.api.v2.evaluation.domain.EvaluationRepository;
import com.ryc.api.v2.evaluation.infra.entity.EvaluationEntity;
import com.ryc.api.v2.evaluation.infra.jpa.EvaluationJpaRepository;
import com.ryc.api.v2.evaluation.infra.mapper.EvaluationMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class EvaluationRepositoryImpl implements EvaluationRepository {
  private final EvaluationJpaRepository evaluationJpaRepository;
  private final AdminJpaRepository adminJpaRepository;
  private final ApplicantJpaRepository applicantJpaRepository;

  @Override
  public Evaluation save(Evaluation evaluation) {
    AdminEntity adminEntity =
        adminJpaRepository
            .findById(evaluation.getEvaluatorId())
            .orElseThrow(() -> new EntityNotFoundException("AdminEntity not found"));

    ApplicantEntity applicantEntity =
        applicantJpaRepository
            .findById(evaluation.getEvaluateeId())
            .orElseThrow(() -> new EntityNotFoundException("ApplicantEntity not found"));

    EvaluationEntity evaluationEntity =
        EvaluationMapper.toEntity(evaluation, adminEntity, applicantEntity);
    return EvaluationMapper.toDomain(evaluationJpaRepository.save(evaluationEntity));
  }
}
