package com.ryc.api.v1.applicant.repository;

import com.ryc.api.v1.applicant.domain.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, String> {
    List<Applicant> findByRecruitmentId(String recruitmentId);
    List<Applicant> findAllByIdIn(List<String> applicantIdList);
    List<Applicant> findByRecruitmentIdAndIsFinalPassedTrue(String recruitmentId);

}
