package com.ryc.api.v1.application.dto.response;

import com.ryc.api.v1.application.dto.internal.QuestionDto;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;


public record GetQuestionResponse(@NotEmpty(message = "stepName shouldn't be empty") String stepName,
                                  @NotEmpty(message = "questions shouldn't be empty") List<QuestionDto> questions) {
}
