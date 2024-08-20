package com.ryc.api.v1.application.repository;

import com.ryc.api.v1.application.domain.answer.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,String> {
}
