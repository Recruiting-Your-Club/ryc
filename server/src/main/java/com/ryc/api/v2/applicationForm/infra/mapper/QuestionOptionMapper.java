package com.ryc.api.v2.applicationForm.infra.mapper;

import com.ryc.api.v2.applicationForm.domain.QuestionOption;
import com.ryc.api.v2.applicationForm.infra.entity.QuestionOptionEntity;

public class QuestionOptionMapper {

  public static QuestionOption toDomain(QuestionOptionEntity entity) {
    return QuestionOption.builder().id(entity.getId()).option(entity.getOption()).build();
  }

  public static QuestionOptionEntity toEntity(QuestionOption option, int displayOrder) {
    return QuestionOptionEntity.builder()
        .id(option.getId())
        .option(option.getOption())
        .displayOrder(displayOrder)
        .build();
  }
}
