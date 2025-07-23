package com.ryc.api.v2.applicant.infra;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.ApplicantRepository;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;
import com.ryc.api.v2.applicant.infra.jpa.ApplicantJpaRepository;
import com.ryc.api.v2.applicant.infra.mapper.ApplicantMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicantRepositoryImpl implements ApplicantRepository {

  private final ApplicantJpaRepository applicantJpaRepository;

  @Override
  public Applicant save(Applicant applicant) {
    return ApplicantMapper.toDomain(
        applicantJpaRepository.save(ApplicantMapper.toEntity(applicant)));
  }

  @Override
  public Applicant findById(String id) {
    return applicantJpaRepository
        .findById(id)
        .map(ApplicantMapper::toDomain)
        .orElseThrow(() -> new EntityNotFoundException("Applicant not found"));
  }

  @Override
  public List<Applicant> findAllByAnnouncementId(String announcementId) {
    return applicantJpaRepository.findAllByAnnouncementId(announcementId).stream()
        .map(ApplicantMapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public List<Applicant> findAllByAnnouncementIdAndStatus(
      String announcementId, ApplicantStatus status) {
    return applicantJpaRepository.findAllByAnnouncementIdAndStatus(announcementId, status).stream()
        .map(ApplicantMapper::toDomain)
        .collect(Collectors.toList());
  }

  @Override
  public Boolean existsByAnnouncementIdAndEmail(String announcementId, String email) {
    return applicantJpaRepository.existsByAnnouncementIdAndEmail(announcementId, email);
  }
}
