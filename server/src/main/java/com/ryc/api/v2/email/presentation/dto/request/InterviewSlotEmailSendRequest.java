package com.ryc.api.v2.email.presentation.dto.request;

import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record InterviewSlotEmailSendRequest(
    @Schema(description = "메일 제목") @NotBlank(message = "메일 제목은 비워둘 수 없습니다.") String subject,
    @Schema(description = "메일 본문") @NotBlank(message = "메일 본문은 비워둘 수 없습니다.") String content) {}
