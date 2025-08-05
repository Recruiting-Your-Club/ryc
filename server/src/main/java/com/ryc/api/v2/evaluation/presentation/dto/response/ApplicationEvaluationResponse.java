package com.ryc.api.v2.evaluation.presentation.dto.response;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationEvaluationResponse(
    @Schema(description = "평가 점수") @NotNull(message = "score shouldn't be null") BigDecimal score,
    @Schema(description = "평가 코멘트") @NotBlank(message = "comment shouldn't be blank")
        String comment) {}
