package com.ryc.api.v1.recruitment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.recruitment.domain.Step;

@Repository
public interface StepRepository extends JpaRepository<Step, String> {}
