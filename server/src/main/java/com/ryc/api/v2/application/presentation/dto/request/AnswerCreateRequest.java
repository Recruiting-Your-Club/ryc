package com.ryc.api.v2.application.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record AnswerCreateRequest(
    @NotNull(message = "questionId shouldn't be null") String questionId,
    String textAnswer,
    String fileMetadataId,
    List<@Valid AnswerChoiceCreateRequest> answerChoices) {
  public AnswerCreateRequest {
    answerChoices = answerChoices == null ? List.of() : answerChoices;
  }

  @Override
  public List<AnswerChoiceCreateRequest> answerChoices() {
    return List.copyOf(answerChoices);
  }
}
