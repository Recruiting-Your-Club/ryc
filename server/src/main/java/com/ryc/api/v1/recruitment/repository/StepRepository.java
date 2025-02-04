package com.ryc.api.v1.recruitment.repository;

import com.ryc.api.v1.recruitment.domain.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StepRepository extends JpaRepository<Step, String> {
}
