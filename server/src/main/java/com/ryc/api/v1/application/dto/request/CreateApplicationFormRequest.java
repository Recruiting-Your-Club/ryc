package com.ryc.api.v1.application.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.application.domain.metadata.Field;
import com.ryc.api.v1.application.dto.internal.QuestionDto;
import com.ryc.api.v1.common.dto.ClubRoleSecuredDto;

public record CreateApplicationFormRequest(
    @NotNull(message = "clubRoleSecuredDto shouldn't be empty")
        ClubRoleSecuredDto clubRoleSecuredDto,
    @NotEmpty(message = "stepId shouldn't be empty") String stepId,
    @NotEmpty(
            message =
                "requiredFields shouldn't be empty (At least the NAME field must be required.)")
        List<Field> requiredFields,
    @NotEmpty(message = "questions shouldn't be empty") List<QuestionDto> questions) {}
