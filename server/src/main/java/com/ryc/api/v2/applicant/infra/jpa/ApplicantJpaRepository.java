package com.ryc.api.v2.applicant.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;

@Repository
public interface ApplicantJpaRepository extends JpaRepository<ApplicantEntity, String> {
  List<ApplicantEntity> findAllByAnnouncementId(String announcementId);

  List<ApplicantEntity> findAllByAnnouncementIdAndStatus(
      String announcementId, ApplicantStatus status);

  Boolean existsByAnnouncementIdAndEmail(String announcementId, String email);
}
