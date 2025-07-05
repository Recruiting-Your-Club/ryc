package com.ryc.api.v2.auth.presentation.request;

import jakarta.validation.constraints.NotEmpty;

import com.ryc.api.v2.auth.domain.AdminDefaultRole;

public record RegisterRequest(
    @NotEmpty(message = "name is empty") String name,
    @NotEmpty(message = "email is empty") String email,
    @NotEmpty(message = "password is empty") String password,
    AdminDefaultRole adminDefaultRole) {
  public RegisterRequest { // compact 생성자
    adminDefaultRole = AdminDefaultRole.USER;
  }
}
