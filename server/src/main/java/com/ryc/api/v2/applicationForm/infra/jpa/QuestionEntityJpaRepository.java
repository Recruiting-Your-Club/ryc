package com.ryc.api.v2.applicationForm.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicationForm.infra.entity.QuestionEntity;

@Repository
public interface QuestionEntityJpaRepository extends JpaRepository<QuestionEntity, String> {}
