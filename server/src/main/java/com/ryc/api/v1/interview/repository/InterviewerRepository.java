package com.ryc.api.v1.interview.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v1.interview.domain.Interview;
import com.ryc.api.v1.interview.domain.Interviewer;
import com.ryc.api.v1.user.domain.User;

@Repository
public interface InterviewerRepository extends JpaRepository<Interviewer, String> {
  Optional<Interviewer> findByInterviewAndUser(Interview interview, User user);
}
