package com.ryc.api.v2.applicant.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.common.validator.request.annotation.Email;
import com.ryc.api.v2.common.validator.request.annotation.UserName;

import lombok.Builder;

@Builder
public record ApplicantCreateRequest(
    @NotBlank(message = "지원자 이메일은 빈 값일 수 없습니다.") @Email String email,
    @NotBlank(message = "지원자 이름은 빈값일 수 없습니다.") @UserName String name,
    List<@NotNull(message = "지원자 개인정보는 빈값일 수 없습니다.") @Valid ApplicantPersonalInfoCreateRequest>
        personalInfos) {
  public ApplicantCreateRequest {
    personalInfos = personalInfos == null ? List.of() : personalInfos;
  }
}
