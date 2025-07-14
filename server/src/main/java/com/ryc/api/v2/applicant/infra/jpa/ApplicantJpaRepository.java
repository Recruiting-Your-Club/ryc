package com.ryc.api.v2.applicant.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;

public interface ApplicantJpaRepository extends JpaRepository<ApplicantEntity, String> {

  @Query("SELECT a.email FROM ApplicantEntity a WHERE a.id = :id")
  Optional<String> findEmailById(String id);

  List<ApplicantEntity> findByAnnouncementId(String announcementId);
}
