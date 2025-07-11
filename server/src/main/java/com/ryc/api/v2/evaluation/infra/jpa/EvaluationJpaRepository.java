package com.ryc.api.v2.evaluation.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.evaluation.infra.entity.EvaluationEntity;

public interface EvaluationJpaRepository extends JpaRepository<EvaluationEntity, String> {}
