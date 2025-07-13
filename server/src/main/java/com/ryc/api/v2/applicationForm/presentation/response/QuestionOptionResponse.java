package com.ryc.api.v2.applicationForm.presentation.response;

import com.ryc.api.v2.applicationForm.domain.QuestionOption;

import lombok.Builder;

@Builder
public record QuestionOptionResponse(String id, String option) {

  public static QuestionOptionResponse from(QuestionOption option) {
    return QuestionOptionResponse.builder().id(option.getId()).option(option.getOption()).build();
  }
}
