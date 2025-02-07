package com.ryc.api.v1.applicant.dto.response;

import com.ryc.api.v1.applicant.dto.internal.ApplicantDto;
import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record GetAllApplicantResponse(@NotEmpty List<ApplicantDto> applicantDtos) {

}
