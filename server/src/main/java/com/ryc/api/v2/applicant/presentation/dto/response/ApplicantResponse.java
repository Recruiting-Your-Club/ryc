package com.ryc.api.v2.applicant.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.applicant.domain.Applicant;
import com.ryc.api.v2.applicant.domain.enums.ApplicantStatus;

import lombok.Builder;

@Builder
public record ApplicantResponse(
    String id,
    String email,
    String name,
    ApplicantStatus status,
    List<ApplicantPersonalInfoResponse> personalInfos) {

  public static ApplicantResponse from(Applicant applicant) {
    List<ApplicantPersonalInfoResponse> personalInfos =
        applicant.getPersonalInfos().stream().map(ApplicantPersonalInfoResponse::from).toList();

    return ApplicantResponse.builder()
        .id(applicant.getId())
        .email(applicant.getEmail())
        .name(applicant.getName())
        .status(applicant.getStatus())
        .personalInfos(personalInfos)
        .build();
  }
}
