package com.ryc.api.v1.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.application.domain.answer.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, String> {
  List<Application> findAllByApplicantIn(List<Applicant> applicants);
}
