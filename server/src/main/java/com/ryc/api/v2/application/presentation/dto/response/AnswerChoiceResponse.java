package com.ryc.api.v2.application.presentation.dto.response;

import com.ryc.api.v2.application.domain.AnswerChoice;
import com.ryc.api.v2.applicationForm.domain.QuestionOption;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record AnswerChoiceResponse(
    @Schema(description = "선택지 ID", example = "uuid-option-1") String optionId,
    @Schema(description = "선택지 내용", example = "Java") String optionLabel) {
  public static AnswerChoiceResponse of(AnswerChoice choice, QuestionOption option) {
    return AnswerChoiceResponse.builder()
        .optionId(choice.getOptionId())
        .optionLabel(option.getOption())
        .build();
  }
}
