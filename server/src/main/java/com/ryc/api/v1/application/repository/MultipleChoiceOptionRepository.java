package com.ryc.api.v1.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.application.domain.question.MultipleChoiceOption;

@Repository
public interface MultipleChoiceOptionRepository
    extends JpaRepository<MultipleChoiceOption, String> {}
