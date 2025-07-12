package com.ryc.api.v2.Interview.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ryc.api.v2.Interview.infra.entity.InterviewSlotEntity;

public interface InterviewSlotJpaRepository extends JpaRepository<InterviewSlotEntity, String> {

  List<InterviewSlotEntity> findByAnnouncementId(String announcementId);
}
