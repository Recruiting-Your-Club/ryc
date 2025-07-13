package com.ryc.api.v2.applicationForm.presentation.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionOptionCreateRequest(
    @NotBlank(message = "option shouldn't be blank") @Schema(description = "질문 선지", example = "선지1")
        String option) {}
