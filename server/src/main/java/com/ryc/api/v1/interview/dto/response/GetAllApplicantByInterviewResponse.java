package com.ryc.api.v1.interview.dto.response;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record GetAllApplicantByInterviewResponse(@NotEmpty(message = "applicantIdList shouldn't be empty") List<String> applicantIdList) {
}
