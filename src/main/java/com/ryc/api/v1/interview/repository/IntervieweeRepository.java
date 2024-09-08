package com.ryc.api.v1.interview.repository;

import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.interview.domain.Interviewee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IntervieweeRepository extends JpaRepository<Interviewee, String> {
    List<Interviewee> findByInterview(Interview interview);
}
