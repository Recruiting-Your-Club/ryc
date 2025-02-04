package com.ryc.api.v1.application.dto.response;

import com.ryc.api.v1.application.domain.question.QuestionType;
import com.ryc.api.v1.application.dto.internal.RequiredFieldDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder

public record GetApplicationResponse(@NotEmpty(message = "applicantId shouldn't be empty") String applicantId,
                                     RequiredFieldDto requiredFieldAnswerDto,
                                     @NotEmpty(message = "stepName shouldn't be empty") List<QuestionAnswerDto> questionAnswerDtos){
    @Builder
    public record QuestionAnswerDto(@NotEmpty(message = "questionId shouldn't be empty") String questionId,
                                    @NotNull(message = "questionOrder shouldn't be empty") Integer questionOrder,
                                    @NotEmpty(message = "questionText shouldn't be empty") String questionText,
                                    @NotNull(message = "questionType shouldn't be empty") QuestionType questionType,
                                    @NotEmpty(message = "answer shouldn't be empty") String answer){
    }
}
