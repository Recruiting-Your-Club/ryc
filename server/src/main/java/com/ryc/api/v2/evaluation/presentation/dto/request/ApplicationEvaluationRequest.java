package com.ryc.api.v2.evaluation.presentation.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.*;

import org.hibernate.validator.constraints.UUID;

public record ApplicationEvaluationRequest(
    @NotBlank(message = "지원자 아이디는 빈 값일 수 없습니다.") @UUID(message = "지원자 id는 UUID 포멧을 준수하여야 합니다.")
        String applicantId,
    @NotNull(message = "평가점수는 빈 값일 수 없습니다.")
        @Digits(integer = 1, fraction = 1, message = "점수는 소수점 1자리까지만 허용됩니다.")
        @DecimalMin(value = "0.0", inclusive = true, message = "점수는 최소 0.0 이상 이어야 합니다.")
        @DecimalMax(value = "5.0", inclusive = true, message = "점수는 최대 5.0 이하 이어야 합니다.")
        BigDecimal score,
    @NotBlank(message = "평가는 빈값일 수 없습니다.") @Max(value = 500, message = "평가는 500자를 초과할 수 없습니다.")
        String comment)
    implements EvaluationRequest {}
