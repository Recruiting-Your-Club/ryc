package com.ryc.api.v1.application.repository;

import com.ryc.api.v1.application.domain.answer.Answer;
import com.ryc.api.v1.application.domain.answer.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,String> {
    List<Answer> findAllByApplication(Application application);
}
