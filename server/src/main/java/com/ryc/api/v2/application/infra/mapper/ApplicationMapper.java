package com.ryc.api.v2.application.infra.mapper;

import com.ryc.api.v2.application.domain.Application;
import com.ryc.api.v2.application.infra.entity.ApplicationEntity;

import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

import java.util.Map;
import java.util.stream.Collectors;

public class ApplicationMapper {
    public static Application toDomain(ApplicationEntity entity) {
        if (entity == null) return null;
        return Application.builder()
                .id(entity.getId())
                .applicantId(entity.getApplicantId())
                .answers(entity.getAnswers().stream().map(AnswerMapper::toDomain).collect(Collectors.toList()))
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }

    public static ApplicationEntity toEntity(Application domain, Map<String, FileMetadataEntity> fileMetadataMap) {
        if (domain == null) return null;
        ApplicationEntity entity = ApplicationEntity.builder()
                .id(domain.getId())
                .applicantId(domain.getApplicantId())
                .build();
        entity.setAnswers(domain.getAnswers().stream().map(answer -> AnswerMapper.toEntity(answer, entity, fileMetadataMap.get(answer.getFileMetadataId()))).collect(Collectors.toList()));
        return entity;
    }
}
