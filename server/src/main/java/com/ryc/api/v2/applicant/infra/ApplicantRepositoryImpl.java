package com.ryc.api.v2.applicant.infra;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.applicant.infra.jpa.ApplicantJpaRepository;
import com.ryc.api.v2.applicant.infra.mapper.ApplicantMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicantRepositoryImpl implements ApplicantRepository {

  private final ApplicantJpaRepository applicantJpaRepository;

  @Override
  public String findEmailById(String id) {
    return applicantJpaRepository
        .findEmailById(id)
        .orElseThrow(() -> new IllegalArgumentException("Applicant not found with id: " + id));
  }

  @Override
  public List<Applicant> findByAnnouncementId(String announcementId) {
    List<ApplicantEntity> entities = applicantJpaRepository.findByAnnouncementId(announcementId);
    return entities.stream().map(ApplicantMapper::toDomain).toList();
  }
}
