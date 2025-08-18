package com.ryc.api.v2.evaluation.presentation.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

public record EvaluationUpdateRequest(
    @Schema(description = "수정된 점수", example = "5") @NotNull(message = "score shouldn't be null")
        BigDecimal score,
    @Schema(description = "수정된 코멘트", example = "훌륭하십니다")
        @NotBlank(message = "comment shouldn't be blank")
        String comment) {}
