package com.ryc.api.v1.application.repository;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.application.domain.answer.Application;
import com.ryc.api.v1.recruitment.domain.Step;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,String> {
    Optional<Application> findByApplicantAndStep(Applicant applicant, Step step);
}
