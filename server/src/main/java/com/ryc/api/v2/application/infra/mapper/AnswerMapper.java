package com.ryc.api.v2.application.infra.mapper;

import com.ryc.api.v2.application.domain.Answer;
import com.ryc.api.v2.application.infra.entity.AnswerEntity;
import com.ryc.api.v2.application.infra.entity.ApplicationEntity;

import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

import java.util.stream.Collectors;

public class AnswerMapper {
    public static Answer toDomain(AnswerEntity entity) {
        if (entity == null) return null;
        return Answer.builder()
                .id(entity.getId())
                .questionId(entity.getQuestionId())
                .answerText(entity.getAnswerText())
                .choices(entity.getChoices().stream().map(AnswerChoiceMapper::toDomain).collect(Collectors.toList()))
                .fileMetadataId(entity.getFileMetadata() != null ? entity.getFileMetadata().getId() : null)
                .build();
    }

    public static AnswerEntity toEntity(Answer domain, ApplicationEntity applicationEntity, FileMetadataEntity fileMetadata) {
        if (domain == null) return null;
        AnswerEntity entity = AnswerEntity.builder()
                .id(domain.getId())
                .application(applicationEntity)
                .questionId(domain.getQuestionId())
                .answerText(domain.getAnswerText())
                .fileMetadata(fileMetadata)
                .build();
        entity.setChoices(domain.getChoices().stream().map(choice -> AnswerChoiceMapper.toEntity(choice, entity)).collect(Collectors.toList()));
        return entity;
    }
}
