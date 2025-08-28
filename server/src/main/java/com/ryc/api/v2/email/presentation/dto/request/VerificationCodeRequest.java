package com.ryc.api.v2.email.presentation.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;

public record VerificationCodeRequest(
    @Schema(description = "인증 받을 이메일")
        @NotBlank(message = "이메일은 공백일 수 없습니다.")
        @Email(message = "인증 받는 이메일 형식이 올바르지 않습니다.")
        String email,
    @Schema(description = "인증 코드")
        @Max(value = 999999, message = "인증 코드는 6자리입니다.")
        @Min(value = 99999, message = "인증 코드는 6자리입니다.")
        Integer code) {}
