package com.ryc.api.v2.applicant.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import lombok.Builder;

@Builder
public record ApplicantPersonalInfoCreateRequest(
    @NotNull(message = "questionId shouldn't be null")
        PersonalInfoQuestionType personalInfoQuestionType,
    @NotBlank(message = "content shouldn't be blank") String value) {}
