package com.ryc.api.v1.evaluation.dto.response;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record GetEvaluationResponse(@NotNull(message = "applicantInfo shouldn't be null") ApplicantDto applicantInfo,
                                    @NotNull(message = "evaluatorInfo shouldn't be null") EvaluatorDto evaluatorInfo,
                                    @NotNull(message = "evaluationInfo shouldn't be null") EvaluationDto evaluationInfo) {

    @Builder
    public record ApplicantDto(@NotEmpty(message = "applicantId shouldn't be empty") String applicantId,
                               @NotEmpty(message = "applicantName shouldn't be empty") String applicantName) {
    }

    @Builder
    public record EvaluatorDto(@NotEmpty(message = "evaluatorUserId shouldn't be empty") String evaluatorUserId,
                                @NotEmpty(message = "evaluatorUserName shouldn't be empty") String evaluatorUserName) {
    }

    @Builder
    public record EvaluationDto(@NotNull(message = "score shouldn't be null") BigDecimal score,
                                 @NotEmpty(message = "comment shouldn't be empty") String comment) {
    }
}
