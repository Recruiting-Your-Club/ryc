package com.ryc.api.v2.applicationForm.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicationForm.infra.entity.QuestionOptionEntity;

@Repository
public interface QuestionOptionJpaRepository extends JpaRepository<QuestionOptionEntity, String> {}
