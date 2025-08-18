package com.ryc.api.v2.application.presentation.dto.response;

import com.ryc.api.v2.applicationForm.domain.QuestionOption;

import lombok.Builder;

@Builder
public record QuestionOptionResponse(String optionId, String option) {
  public static QuestionOptionResponse from(QuestionOption option) {
    return QuestionOptionResponse.builder()
        .optionId(option.getId())
        .option(option.getOption())
        .build();
  }
}
