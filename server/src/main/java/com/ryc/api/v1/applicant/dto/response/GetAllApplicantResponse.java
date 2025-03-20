package com.ryc.api.v1.applicant.dto.response;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

import com.ryc.api.v1.applicant.dto.internal.ApplicantDto;

public record GetAllApplicantResponse(@NotEmpty List<ApplicantDto> applicantDtos) {}
