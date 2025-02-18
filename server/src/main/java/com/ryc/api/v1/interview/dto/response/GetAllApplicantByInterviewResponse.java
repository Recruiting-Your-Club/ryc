package com.ryc.api.v1.interview.dto.response;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;

public record GetAllApplicantByInterviewResponse(
    @NotEmpty(message = "applicantIdList shouldn't be empty") List<String> applicantIdList) {}
