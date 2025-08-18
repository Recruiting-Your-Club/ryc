package com.ryc.api.v2.evaluation.presentation.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

// TODO: 0.5 단위 유효성 검증 추가
public record ApplicationEvaluationRequest(
    @NotEmpty(message = "applicantId shouldn't be empty") String applicantId,
    @DecimalMin(value = "0.0", inclusive = true, message = "점수는 최소 0.0 이상 이어야 합니다.")
        @DecimalMax(value = "5.0", inclusive = true, message = "점수는 최대 5.0 이하 이어야 합니다.")
        @NotNull(message = "score shouldn't be null")
        BigDecimal score,
    @NotEmpty(message = "comment shouldn't be empty") String comment)
    implements EvaluationRequest {}
