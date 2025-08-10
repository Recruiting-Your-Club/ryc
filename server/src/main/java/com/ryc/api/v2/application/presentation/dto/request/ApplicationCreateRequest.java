package com.ryc.api.v2.application.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;

import lombok.Builder;

@Builder
public record ApplicationCreateRequest(List<@Valid AnswerCreateRequest> answers) {
  public ApplicationCreateRequest {
    answers = answers == null ? List.of() : answers;
  }

  @Override
  public List<AnswerCreateRequest> answers() {
    return List.copyOf(answers);
  }
}
