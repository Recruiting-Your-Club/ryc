package com.ryc.api.v1.evaluation.dto.response;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record GetEvaluationResponse(
    @NotNull(message = "applicantInfo shouldn't be null") ApplicantDto applicantInfo,
    @NotEmpty(message = "evaluationInfo shouldn't be null") List<EvaluationDto> evaluationInfos) {

  @Builder
  public record ApplicantDto(
      @NotEmpty(message = "applicantId shouldn't be empty") String applicantId,
      @NotEmpty(message = "applicantName shouldn't be empty") String applicantName) {}

  @Builder
  public record EvaluationDto(
      @NotEmpty(message = "evaluatorUserId shouldn't be empty") String evaluatorUserId,
      @NotEmpty(message = "evaluatorUserName shouldn't be empty") String evaluatorUserName,
      @NotNull(message = "score shouldn't be null") BigDecimal score,
      @NotEmpty(message = "comment shouldn't be empty") String comment) {}
}
