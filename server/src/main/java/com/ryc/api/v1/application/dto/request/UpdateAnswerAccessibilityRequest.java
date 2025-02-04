package com.ryc.api.v1.application.dto.request;

import jakarta.validation.constraints.NotNull;

public record UpdateAnswerAccessibilityRequest(@NotNull boolean isAccessible) {
}
