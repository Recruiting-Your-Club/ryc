package com.ryc.api.v2.applicant.presentation.dto.response;

import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;

import lombok.Builder;

@Builder
public record ApplicantPersonalInfoResponse(
    String id, String PersonalInfoQuestionType, String value) {

  public static ApplicantPersonalInfoResponse from(ApplicantPersonalInfo personalInfo) {

    return ApplicantPersonalInfoResponse.builder()
        .id(personalInfo.getId())
        .PersonalInfoQuestionType(personalInfo.getQuestionType().name())
        .value(personalInfo.getValue())
        .build();
  }
}
