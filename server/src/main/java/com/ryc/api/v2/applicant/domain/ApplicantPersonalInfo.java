package com.ryc.api.v2.applicant.domain;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantPersonalInfoCreateRequest;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApplicantPersonalInfo {
  private final String id;
  private final PersonalInfoQuestionType questionType;
  private final String value;

  public static ApplicantPersonalInfo initialize(ApplicantPersonalInfoCreateRequest request) {
    return ApplicantPersonalInfo.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .questionType(request.personalInfoQuestionType())
        .value(request.value())
        .build();
  }
}
