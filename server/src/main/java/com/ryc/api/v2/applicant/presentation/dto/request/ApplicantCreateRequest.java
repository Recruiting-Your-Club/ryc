package com.ryc.api.v2.applicant.presentation.dto.request;

import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Builder;

@Builder
public record ApplicantCreateRequest(
    @NotBlank(message = "email shouldn't be blank") String email,
    @NotBlank(message = "name shouldn't be blank") String name,
    List<
            @NotNull(message = "personalInfo shouldn't be null") @Valid
            ApplicantPersonalInfoCreateRequest>
        personalInfos) {
  public ApplicantCreateRequest {
    personalInfos = personalInfos == null ? List.of() : personalInfos;
  }
}
