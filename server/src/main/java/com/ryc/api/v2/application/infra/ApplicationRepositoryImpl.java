package com.ryc.api.v2.application.infra;

import java.time.LocalDateTime;
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
  public Application save(Application application, String applicantId) {
    List<String> fileMetadataIds =
        application.getAnswers().stream().map(Answer::getFileMetadataId).toList();

    Map<String, FileMetadataEntity> fileMetadataMap =
        fileMetadataJpaRepository.findAllById(fileMetadataIds).stream()
            .collect(Collectors.toMap(FileMetadataEntity::getId, entity -> entity));

    return ApplicationMapper.toDomain(
        applicationJpaRepository.save(
            ApplicationMapper.toEntity(application, fileMetadataMap, applicantId)));
  }

  @Override
  public Application findByApplicantId(String applicantId) {
    return applicationJpaRepository
        .findByApplicantId(applicantId)
        .map(ApplicationMapper::toDomain)
        .orElseThrow(() -> new EntityNotFoundException("Application not found"));
  }

  @Override
  public Map<String, LocalDateTime> findCreatedAtByApplicantIds(List<String> applicantIds) {
    List<Object[]> objects = applicationJpaRepository.findCreatedAtByApplicantIds(applicantIds);
    return objects.stream()
        .collect(
            Collectors.toMap(
                object -> (String) object[0], // applicantId
                object -> (LocalDateTime) object[1])); // createdAt
  }
}
