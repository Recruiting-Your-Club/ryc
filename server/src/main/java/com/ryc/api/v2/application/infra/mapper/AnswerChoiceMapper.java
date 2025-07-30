package com.ryc.api.v2.application.infra.mapper;

import com.ryc.api.v2.application.domain.AnswerChoice;
import com.ryc.api.v2.application.infra.entity.AnswerChoiceEntity;
import com.ryc.api.v2.application.infra.entity.AnswerEntity;

public class AnswerChoiceMapper {
  public static AnswerChoice toDomain(AnswerChoiceEntity entity) {
    if (entity == null) return null;
    return AnswerChoice.builder().id(entity.getId()).optionId(entity.getOptionId()).build();
  }

  public static AnswerChoiceEntity toEntity(AnswerChoice domain, AnswerEntity answerEntity) {
    if (domain == null) return null;

    return AnswerChoiceEntity.builder()
        .id(domain.getId())
        .answer(answerEntity)
        .optionId(domain.getOptionId())
        .build();
  }
}
