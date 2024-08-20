package com.ryc.api.v1.application.dto.request;

import com.ryc.api.v1.application.domain.answer.Answer;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record CreateApplicationRequest(@NotEmpty(message = "stepId shouldn't be empty") String stepId,
                                       @NotEmpty(message = "answers shouldn't be empty") List<QuestionAnswerDto> answers) {

    public record QuestionAnswerDto(@NotEmpty(message = "questionId shouldn't be empty") String questionId,
                                    String optionAnswerId,
                                    String subjectiveAnswer) {
    }
}