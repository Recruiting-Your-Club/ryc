package com.ryc.api.v2.applicant.domain;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantPersonalInfoCreateRequest;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApplicantPersonalInfo {
  private final String id;
  private final PersonalInfoQuestionType questionType;
  private final String value;

  @Builder
  private ApplicantPersonalInfo(String id, PersonalInfoQuestionType questionType, String value) {

    ApplicantPersonalInfoValidator.ValidatedApplicantPersonalInfo validated =
        ApplicantPersonalInfoValidator.validateAndSanitize(id, questionType, value);

    this.id = validated.id();
    this.questionType = validated.questionType();
    this.value = validated.value();
  }

  public static ApplicantPersonalInfo initialize(ApplicantPersonalInfoCreateRequest request) {
    return ApplicantPersonalInfo.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .questionType(request.personalInfoQuestionType())
        .value(request.value())
        .build();
  }
}
