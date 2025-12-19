package com.ryc.api.v2.auth.presentation.request;

import jakarta.validation.constraints.NotBlank;

import com.ryc.api.v2.admin.domain.AdminDefaultRole;
import com.ryc.api.v2.common.validator.request.annotation.Email;
import com.ryc.api.v2.common.validator.request.annotation.Password;
import com.ryc.api.v2.common.validator.request.annotation.UserName;

import lombok.Builder;

@Builder
public record RegisterRequest(
    @NotBlank(message = "이름은 공백일 수 없습니다.") @UserName String name,
    @NotBlank(message = "이메일은 공백일 수 없습니다.") @Email String email,
    @NotBlank(message = "비밀번호는 공백일 수 없습니다.") @Password String password,
    AdminDefaultRole adminDefaultRole) {
  public RegisterRequest {
    adminDefaultRole = AdminDefaultRole.USER;
  }
}
