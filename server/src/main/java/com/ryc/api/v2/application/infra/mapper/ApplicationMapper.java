package com.ryc.api.v2.application.infra.mapper;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.infra.entity.AnswerEntity;
import com.ryc.api.v2.application.infra.entity.ApplicationEntity;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

public class ApplicationMapper {
  public static Application toDomain(ApplicationEntity entity) {
    if (entity == null) return null;
    return Application.builder()
        .id(entity.getId())
        .applicantId(entity.getApplicantId())
        .answers(
            entity.getAnswers().stream().map(AnswerMapper::toDomain).collect(Collectors.toList()))
        .createdAt(entity.getCreatedAt())
        .build();
  }

  public static ApplicationEntity toEntity(
      Application domain, Map<String, FileMetadataEntity> fileMetadataMap) {
    if (domain == null) return null;

    ApplicationEntity entity =
        ApplicationEntity.builder().id(domain.getId()).applicantId(domain.getApplicantId()).build();

    List<AnswerEntity> answers =
        domain.getAnswers().stream()
            .map(
                answer ->
                    AnswerMapper.toEntity(
                        answer, entity, fileMetadataMap.get(answer.getFileMetadataId())))
            .collect(Collectors.toList());
    entity.setAnswers(answers);

    return entity;
  }
}
