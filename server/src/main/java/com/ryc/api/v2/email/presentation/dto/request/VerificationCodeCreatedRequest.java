package com.ryc.api.v2.email.presentation.dto.request;

import jakarta.validation.constraints.Email;

import io.swagger.v3.oas.annotations.media.Schema;

public record VerificationCodeCreatedRequest(
    @Schema(description = "인증 받을 이메일") @Email(message = "인증 받는 이메일 형식이 올바르지 않습니다.") String email) {}
