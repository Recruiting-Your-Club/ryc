package com.ryc.api.v2.applicant.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ryc.api.v2.applicant.infra.entity.ApplicantPersonalInfoEntity;
import com.ryc.api.v2.applicant.infra.projection.ApplicantImageProjection;

public interface ApplicantPersonalInfoJpaRepository
    extends JpaRepository<ApplicantPersonalInfoEntity, String> {
  @Query(
      "SELECT e.applicant.id as applicantId, e.value as imageUrl "
          + "FROM ApplicantPersonalInfoEntity e "
          + "WHERE e.applicant.id IN :applicantIds AND e.questionType = 'PROFILE_IMAGE'")
  List<ApplicantImageProjection> findImageUrlsByApplicantIds(
      @Param("applicantIds") List<String> applicantIds);
}
