package com.ryc.api.v2.email.presentation.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewReminderUpdatedRequest(
    @Schema(description = "면접 알림 시간")
        @NotNull(message = "면접 알림 시간은 null일 수 없습니다.")
        @Min(value = 0, message = "면접 알림 시간은 0보다 작을 수 없습니다.")
        Integer relativeHour) {}
