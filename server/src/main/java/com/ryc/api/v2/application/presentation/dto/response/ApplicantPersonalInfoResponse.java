package com.ryc.api.v2.application.presentation.dto.response;

import com.ryc.api.v2.applicant.domain.ApplicantPersonalInfo;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicantPersonalInfoResponse(
    @Schema(description = "개인정보 질문 유형", example = "STUDENT_ID")
        PersonalInfoQuestionType questionType,
    @Schema(description = "답변 내용", example = "202012345") String value) {
  public static ApplicantPersonalInfoResponse from(ApplicantPersonalInfo personalInfo) {
    return ApplicantPersonalInfoResponse.builder()
        .questionType(personalInfo.getQuestionType())
        .value(personalInfo.getValue())
        .build();
  }
}
