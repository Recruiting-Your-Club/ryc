package com.ryc.api.v2.application.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record ApplicationCreateRequest(
    List<@NotNull(message = "각 응답 원소는 null일 수 없습니다.") @Valid AnswerCreateRequest> answers) {
  public ApplicationCreateRequest {
    answers = answers == null ? List.of() : answers;
  }

  @Override
  public List<AnswerCreateRequest> answers() {
    return List.copyOf(answers);
  }
}
