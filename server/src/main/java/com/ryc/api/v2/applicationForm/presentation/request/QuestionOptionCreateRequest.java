package com.ryc.api.v2.applicationForm.presentation.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionOptionCreateRequest(
    @Schema(description = "질문 선지", example = "선지1")
        @NotBlank(message = "각 질문 선지는 빈값일 수 없습니다.")
        @Max(value = 200, message = "각 질문 선지는 200자를 초과할 수 없습니다.")
        String option) {}
