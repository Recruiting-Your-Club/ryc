package com.ryc.api.v1.evaluation.dto.response;

import com.ryc.api.v1.applicant.dto.internal.ApplicantDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record GetPasserResponse(@NotEmpty(message = "applicantId shouldn't be empty") String applicantId,
                                @NotNull(message = "applicantDto shouldn't be null") ApplicantDto applicantDto) {
}
