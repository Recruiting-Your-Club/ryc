package com.ryc.api.v2.applicationForm.presentation.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import org.hibernate.validator.constraints.UUID;

import io.swagger.v3.oas.annotations.media.Schema;

public record QuestionOptionUpdateRequest(
    @Schema(
            description = "질문 선지 ID, 새로운 선지일시 null 입력",
            example = "e23e4567-e89b-12d3-a456-426614174000")
        @NotBlank(message = "질문 선지 id는 빈값일 수 없습니다.")
        @UUID(message = "질문 선지 id는 UUID 포멧이어야 합니다.")
        String id,
    @Schema(description = "질문 선지", example = "보기1")
        @NotBlank(message = "각 질문 선지는 빈값일 수 없습니다.")
        @Size(max = 200, message = "각 질문 선지는 200자를 초과할 수 없습니다.")
        String option) {}
