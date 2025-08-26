package com.ryc.api.v2.auth.presentation.request;

import com.ryc.api.v2.common.validator.request.annotation.Email;
import com.ryc.api.v2.common.validator.request.annotation.UserName;
import jakarta.validation.constraints.NotBlank;

import com.ryc.api.v2.admin.domain.AdminDefaultRole;

public record RegisterRequest(
    @NotBlank(message = "이름은 공백일 수 없습니다.")
    @UserName
    String name,

    @NotBlank(message = "이메일은 공백일 수 없습니다.")
    @Email
    String email,

    @NotBlank(message = "password is empty")
    @P
    String password,

    AdminDefaultRole adminDefaultRole) {
  public RegisterRequest { // compact 생성자
    adminDefaultRole = AdminDefaultRole.USER;
  }
}
