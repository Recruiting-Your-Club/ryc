package com.ryc.api.v1.application.dto.request;

import com.ryc.api.v1.application.dto.internal.QuestionDto;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateQuestionRequest(@NotEmpty(message = "stepId shouldn't be empty") String stepId,
                                    @NotEmpty(message = "questions shouldn't be empty") List<QuestionDto> questions) {
}
