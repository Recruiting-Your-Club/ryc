package com.ryc.api.v2.applicant.infra.jpa;

import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicantJpaRepository extends JpaRepository<ApplicantEntity, String> {
    List<ApplicantEntity> findAllByAnnouncementId(String announcementId);
}
