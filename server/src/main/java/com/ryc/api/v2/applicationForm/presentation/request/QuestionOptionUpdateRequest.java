package com.ryc.api.v2.applicationForm.presentation.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionOptionUpdateRequest(
    @Schema(
            description = "질문 선지 ID, 새로운 선지일시 null 입력",
            example = "e23e4567-e89b-12d3-a456-426614174000")
        String id,
    @Schema(description = "질문 선지", example = "보기1") @NotBlank(message = "option shouldn't be blank")
        String option) {}
