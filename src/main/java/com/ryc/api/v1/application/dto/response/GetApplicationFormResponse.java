package com.ryc.api.v1.application.dto.response;

import com.ryc.api.v1.application.domain.metadata.Field;
import com.ryc.api.v1.application.dto.internal.QuestionDto;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;


public record GetApplicationFormResponse(@NotEmpty(message = "stepName shouldn't be empty") String stepName,
                                         @NotEmpty(message = "requiredFields shouldn't be empty") List<Field> requiredFields,
                                         @NotEmpty(message = "questions shouldn't be empty") List<QuestionDto> questions) {
}
