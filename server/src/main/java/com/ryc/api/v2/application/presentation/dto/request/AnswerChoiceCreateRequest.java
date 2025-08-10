package com.ryc.api.v2.application.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import lombok.Builder;

@Builder
public record AnswerChoiceCreateRequest(
    @NotBlank(message = "optionId shouldn't be blank") String optionId) {}
