package com.ryc.api.v2.application.infra;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.domain.ApplicationRepository;
import com.ryc.api.v2.application.infra.jpa.ApplicationJpaRepository;
import com.ryc.api.v2.application.infra.mapper.ApplicationMapper;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;
import com.ryc.api.v2.s3.infra.jpa.FileMetadataJpaRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ApplicationRepositoryImpl implements ApplicationRepository {

  private final ApplicationJpaRepository applicationJpaRepository;
  private final FileMetadataJpaRepository fileMetadataJpaRepository;

  @Override
  public Application findByApplicantId(String applicantId) {
    return applicationJpaRepository
        .findByApplicantId(applicantId)
        .map(ApplicationMapper::toDomain)
        .orElseThrow(() -> new EntityNotFoundException("Application not found"));
  }

  @Override
  public List<Application> findAllByApplicantIdIn(List<String> applicantIds) {
    return applicationJpaRepository.findAllByApplicantIdIn(applicantIds).stream()
        .map(ApplicationMapper::toDomain)
        .collect(Collectors.toList());
  }
}
