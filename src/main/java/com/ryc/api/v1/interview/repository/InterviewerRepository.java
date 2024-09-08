package com.ryc.api.v1.interview.repository;

import com.ryc.api.v1.interview.domain.Interviewer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, String> {
}
