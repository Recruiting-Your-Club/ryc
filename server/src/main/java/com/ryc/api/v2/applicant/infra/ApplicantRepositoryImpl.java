package com.ryc.api.v2.applicant.infra;

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
  public Applicant findById(String id) {
    ApplicantEntity entity =
        applicantJpaRepository
            .findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Applicant not found with id: " + id));
    return ApplicantMapper.toDomain(entity);
  }
}
