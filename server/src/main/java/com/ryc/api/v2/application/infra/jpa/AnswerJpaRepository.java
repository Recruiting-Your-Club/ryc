package com.ryc.api.v2.application.infra.jpa;

import com.ryc.api.v2.application.infra.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerJpaRepository extends JpaRepository<AnswerEntity, String> {
}
