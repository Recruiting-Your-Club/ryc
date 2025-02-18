package com.ryc.api.v1.passer.dto.response;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v1.application.dto.internal.RequiredFieldDto;

import lombok.Builder;

@Builder
public record GetAllFinalPasserResponse(
    @NotEmpty(message = "applicantId shouldn't be empty") String applicantId,
    @NotNull(message = "applicantDtos shouldn't be null") RequiredFieldDto applicantDtos) {}
