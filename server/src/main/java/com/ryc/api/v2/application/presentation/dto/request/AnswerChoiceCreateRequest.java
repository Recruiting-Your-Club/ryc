package com.ryc.api.v2.application.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.UUID;

import lombok.Builder;

@Builder
public record AnswerChoiceCreateRequest(
    @NotBlank(message = "객관식 응답값인 선지 ID는 필수 입니다.")
        @UUID(message = "객관식 응답값인 선지 ID는 UUID 포멧이어야 합니다.")
        String optionId) {}
