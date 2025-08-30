package com.ryc.api.v2.application.presentation.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantCreateRequest;

import lombok.Builder;

@Builder
public record ApplicationSubmissionRequest(
    @NotNull(message = "지원자 필드(applicant)는 필수 입력 항목입니다.") @Valid ApplicantCreateRequest applicant,
    @NotNull(message = "지원서 필드(application)는 필수 입력 항목입니다.") @Valid
        ApplicationCreateRequest application) {}
