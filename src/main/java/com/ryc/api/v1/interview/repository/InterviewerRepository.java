package com.ryc.api.v1.interview.repository;

import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.interview.domain.Interviewer;
import com.ryc.api.v1.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, String> {
    Optional<Interviewer> findByInterviewAndUser(Interview interview, User user);
}
