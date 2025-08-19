package com.ryc.api.v2.applicant.domain;

import com.ryc.api.v2.applicant.presentation.dto.request.ApplicantPersonalInfoCreateRequest;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ApplicantPersonalInfo {
  private final String id;
  private final PersonalInfoQuestionType questionType;
  private final String value;

  @Builder
  private ApplicantPersonalInfo(String id, PersonalInfoQuestionType questionType, String value) {

    // 1. 정제
    String resolvedValue;
    if (questionType.equals(PersonalInfoQuestionType.EMAIL))
      resolvedValue = DataResolveUtil.sanitizeEmail(value);
    else resolvedValue = DataResolveUtil.sanitizeString(value);

    // 2. 검증
    ApplicantPersonalInfoValidator.validate(id, questionType, resolvedValue);

    // 3. 할당
    this.id = id;
    this.questionType = questionType;
    this.value = resolvedValue;
  }

  public static ApplicantPersonalInfo initialize(ApplicantPersonalInfoCreateRequest request) {
    return ApplicantPersonalInfo.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .questionType(request.personalInfoQuestionType())
        .value(request.value())
        .build();
  }
}
