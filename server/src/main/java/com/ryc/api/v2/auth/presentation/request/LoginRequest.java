package com.ryc.api.v2.auth.presentation.request;

import jakarta.validation.constraints.NotBlank;

import com.ryc.api.v2.common.validator.request.annotation.Email;
import com.ryc.api.v2.common.validator.request.annotation.Password;

public record LoginRequest(
    @NotBlank(message = "이메일은 빈값일 수 없습니다.") @Email String email,
    @NotBlank(message = "비밀번호는 빈값일 수 없습니다.") @Password String password) {}
