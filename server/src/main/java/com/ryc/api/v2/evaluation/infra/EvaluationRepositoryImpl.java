package com.ryc.api.v2.evaluation.infra;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.admin.infra.jpa.AdminJpaRepository;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.applicant.infra.jpa.ApplicantJpaRepository;
import com.ryc.api.v2.evaluation.domain.Evaluation;
import com.ryc.api.v2.evaluation.domain.EvaluationRepository;
import com.ryc.api.v2.evaluation.domain.EvaluationType;
import com.ryc.api.v2.evaluation.infra.entity.EvaluationEntity;
import com.ryc.api.v2.evaluation.infra.jpa.EvaluationJpaRepository;
import com.ryc.api.v2.evaluation.infra.mapper.EvaluationMapper;

import lombok.RequiredArgsConstructor;

// TODO: 컨벤션 정의 필요. Infra 레이어에서 예외처리 책임 어디까지 들고 있을 것인지.
@Repository
@RequiredArgsConstructor
public class EvaluationRepositoryImpl implements EvaluationRepository {
  private final EvaluationJpaRepository evaluationJpaRepository;
  private final AdminJpaRepository adminJpaRepository;
  private final ApplicantJpaRepository applicantJpaRepository;

  @Override
  public Evaluation save(Evaluation evaluation) {
    if (evaluation == null) {
      throw new IllegalArgumentException("Evaluation must not be null");
    }

    AdminEntity adminEntity =
        adminJpaRepository
            .findById(evaluation.getEvaluatorId())
            .filter(entity -> !entity.getIsDeleted())
            .orElseThrow(() -> new NoSuchElementException("AdminEntity not found or deleted"));

    ApplicantEntity applicantEntity =
        applicantJpaRepository
            .findById(evaluation.getEvaluateeId())
            .orElseThrow(() -> new NoSuchElementException("ApplicantEntity not found or deleted"));

    EvaluationEntity evaluationEntity =
        EvaluationMapper.toEntity(evaluation, adminEntity, applicantEntity);
    return EvaluationMapper.toDomain(evaluationJpaRepository.save(evaluationEntity));
  }

  @Override
  public List<Evaluation> findEvaluationsByApplicantIdsAndType(
      List<String> applicantIdList, EvaluationType type) {
    if (applicantIdList == null || applicantIdList.isEmpty()) {
      throw new IllegalArgumentException("ApplicantIdList must not be null or empty");
    }

    return evaluationJpaRepository
        .findEvaluationsByApplicantIdsAndType(applicantIdList, type)
        .stream()
        .map(EvaluationMapper::toDomain)
        .toList();
  }

  @Override
  public List<String> findEvaluatedApplicantIds(
      String evaluatorId, EvaluationType type, List<String> applicantIdList) {
    return evaluationJpaRepository.findEvaluatedApplicantIds(evaluatorId, type, applicantIdList);
  }

  @Override
  public Evaluation findEvaluationById(String evaluationId) {
    return evaluationJpaRepository
        .findById(evaluationId)
        .map(EvaluationMapper::toDomain)
        .orElseThrow(() -> new NoSuchElementException("evaluationEntity not found or deleted"));
  }

  @Override
  public void deleteById(String evaluationId) {
    evaluationJpaRepository.deleteById(evaluationId);
  }

  @Override
  public void deleteAllByApplicantId(String applicantId) {
    evaluationJpaRepository.deleteByApplicantEntityId(applicantId);
  }

  @Override
  public void deleteAllByAdminId(String adminId) {
    evaluationJpaRepository.deleteAllByAdminEntityId(adminId);
  }
}
