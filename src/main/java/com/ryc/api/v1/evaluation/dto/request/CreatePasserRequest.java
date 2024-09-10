package com.ryc.api.v1.evaluation.dto.request;

import jakarta.validation.constraints.NotEmpty;

public record CreatePasserRequest(@NotEmpty(message = "clubId shouldn't be empty") String clubId,
                                  @NotEmpty(message = "stepId shouldn't be empty") String stepId,
                                  @NotEmpty(message = "applicantId shouldn't be empty") String applicantId) {
}
