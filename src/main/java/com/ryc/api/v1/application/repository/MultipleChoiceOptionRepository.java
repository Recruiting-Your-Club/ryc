package com.ryc.api.v1.application.repository;

import com.ryc.api.v1.application.domain.MultipleChoiceOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MultipleChoiceOptionRepository extends JpaRepository<MultipleChoiceOption, String> {
}
