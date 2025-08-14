package com.ryc.api.v2.applicant.infra.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;

@Repository
public interface ApplicantJpaRepository extends JpaRepository<ApplicantEntity, String> {

  @Query("SELECT a.email FROM ApplicantEntity a WHERE a.id = :id")
  Optional<String> findEmailById(String id);

  List<ApplicantEntity> findAllByAnnouncementId(String announcementId);

  List<ApplicantEntity> findAllByAnnouncementIdAndStatus(
      String announcementId, ApplicantStatus status);

  Boolean existsByAnnouncementIdAndEmail(String announcementId, String email);

  List<ApplicantEntity> findAllByEmailIn(List<String> emails);
}
