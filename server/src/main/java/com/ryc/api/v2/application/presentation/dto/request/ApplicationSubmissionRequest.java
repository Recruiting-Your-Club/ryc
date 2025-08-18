package com.ryc.api.v2.application.presentation.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantCreateRequest;

import lombok.Builder;

@Builder
public record ApplicationSubmissionRequest(
    @NotNull(message = "applicant shouldn't be null") @Valid ApplicantCreateRequest applicant,
    @NotNull(message = "application shouldn't be null") @Valid
        ApplicationCreateRequest application) {}
