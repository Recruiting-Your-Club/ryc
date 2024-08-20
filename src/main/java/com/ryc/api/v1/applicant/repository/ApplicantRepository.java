package com.ryc.api.v1.applicant.repository;

import com.ryc.api.v1.applicant.domain.Applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, String> {
}
