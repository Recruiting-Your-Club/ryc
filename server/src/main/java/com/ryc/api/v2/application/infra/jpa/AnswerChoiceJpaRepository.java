package com.ryc.api.v2.application.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.application.infra.entity.AnswerChoiceEntity;

@Repository
public interface AnswerChoiceJpaRepository extends JpaRepository<AnswerChoiceEntity, String> {}
