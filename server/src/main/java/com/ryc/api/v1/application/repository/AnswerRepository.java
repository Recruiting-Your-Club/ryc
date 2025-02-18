package com.ryc.api.v1.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.application.domain.answer.Answer;
import com.ryc.api.v1.application.domain.answer.Application;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, String> {
  List<Answer> findAllByApplication(Application application);
}
