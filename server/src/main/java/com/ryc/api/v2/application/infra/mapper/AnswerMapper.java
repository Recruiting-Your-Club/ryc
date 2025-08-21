package com.ryc.api.v2.application.infra.mapper;

import java.util.List;
import java.util.stream.Collectors;

import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.domain.AnswerChoice;
import com.ryc.api.v2.application.infra.entity.AnswerChoiceEntity;
import com.ryc.api.v2.application.infra.entity.AnswerEntity;
import com.ryc.api.v2.application.infra.entity.ApplicationEntity;
import com.ryc.api.v2.file.infra.entity.FileMetadataEntity;

public class AnswerMapper {
  public static Answer toDomain(AnswerEntity entity) {
    if (entity == null) return null;

    List<AnswerChoice> choices =
        entity.getChoices().stream().map(AnswerChoiceMapper::toDomain).collect(Collectors.toList());

    return Answer.builder()
        .id(entity.getId())
        .questionId(entity.getQuestionId())
        .textAnswer(entity.getTextAnswer())
        .choices(choices)
        .fileMetadataId(entity.getFileMetadata() != null ? entity.getFileMetadata().getId() : null)
        .build();
  }

  public static AnswerEntity toEntity(
      Answer domain, ApplicationEntity applicationEntity, FileMetadataEntity fileMetadata) {
    if (domain == null) return null;

    AnswerEntity entity =
        AnswerEntity.builder()
            .id(domain.getId())
            .application(applicationEntity)
            .questionId(domain.getQuestionId())
            .textAnswer(domain.getTextAnswer())
            .fileMetadata(fileMetadata)
            .build();
    List<AnswerChoiceEntity> choices =
        domain.getChoices().stream()
            .map(choice -> AnswerChoiceMapper.toEntity(choice, entity))
            .collect(Collectors.toList());
    entity.setChoices(choices);
    return entity;
  }
}
