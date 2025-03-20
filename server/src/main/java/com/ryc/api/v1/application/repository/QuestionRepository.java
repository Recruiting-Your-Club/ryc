package com.ryc.api.v1.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.application.domain.question.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, String> {}
