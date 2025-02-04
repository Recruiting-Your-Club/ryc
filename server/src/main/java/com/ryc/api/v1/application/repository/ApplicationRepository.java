package com.ryc.api.v1.application.repository;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.application.domain.answer.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,String> {
    List<Application> findAllByApplicantIn(List<Applicant> applicants);
}
