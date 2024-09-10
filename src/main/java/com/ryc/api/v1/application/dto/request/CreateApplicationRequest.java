package com.ryc.api.v1.application.dto.request;

import com.ryc.api.v1.application.dto.internal.RequiredFieldDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateApplicationRequest(@NotEmpty(message = "stepId shouldn't be empty") String stepId,
                                       @NotNull(message = "requiredFieldAnswers shouldn't be null") RequiredFieldDto requiredFieldAnswers,
                                       @NotEmpty(message = "answers shouldn't be empty") List<QuestionAnswerDto> answers) {

    public record QuestionAnswerDto(@NotEmpty(message = "questionId shouldn't be empty") String questionId,
                                    String optionAnswerId,
                                    String subjectiveAnswer) {
    }
}