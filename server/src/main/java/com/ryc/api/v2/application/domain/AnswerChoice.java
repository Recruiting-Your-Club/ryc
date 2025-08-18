package com.ryc.api.v2.application.domain;

import com.ryc.api.v2.application.presentation.dto.request.AnswerChoiceCreateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
public class AnswerChoice {
  private final String id;
  private final String optionId;

  @Builder
  private AnswerChoice(String id, String optionId) {

    AnswerChoiceValidator.ValidatedAnswerChoice validated =
        AnswerChoiceValidator.validateAndSanitize(id, optionId);

    this.id = validated.id();
    this.optionId = validated.optionId();
  }

  public static AnswerChoice initialize(AnswerChoiceCreateRequest request) {
    return AnswerChoice.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .optionId(request.optionId())
        .build();
  }
}
