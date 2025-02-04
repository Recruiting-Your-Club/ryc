package com.ryc.api.v1.application.repository;

import com.ryc.api.v1.application.domain.metadata.ApplicationDefaultField;
import com.ryc.api.v1.recruitment.domain.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationDefaultFieldRepository extends JpaRepository<ApplicationDefaultField,String> {
    List<ApplicationDefaultField> findByStep(Step step);
}
