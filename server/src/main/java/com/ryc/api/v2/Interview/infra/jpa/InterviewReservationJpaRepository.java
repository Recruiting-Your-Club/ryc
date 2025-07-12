package com.ryc.api.v2.Interview.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.Interview.infra.entity.InterviewReservationEntity;

public interface InterviewReservationJpaRepository
    extends JpaRepository<InterviewReservationEntity, String> {

  List<InterviewReservationEntity> findByInterviewSlotId(String interviewSlotId);
}
