package com.ryc.api.v2.applicationForm.presentation.response;

import java.util.List;

import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationFormResponse(
    @Schema(description = "공고폼 ID", example = "e23e4567-e89b-12d3-a456-426614174000") String id,
    @Schema(description = "지원서 질문") List<QuestionResponse> applicationQuestions,
    @Schema(description = "사전 질문") List<QuestionResponse> preQuestions,
    @Schema(description = "개인정보 질문", example = "[\"NAME\", \"EMAIL\"]")
        List<PersonalInfoQuestionType> personalInfoQuestionTypes) {
  public static ApplicationFormResponse from(ApplicationForm application) {
    List<QuestionResponse> applicationQuestions =
        application.getApplicationQuestions().stream().map(QuestionResponse::from).toList();
    List<QuestionResponse> preQuestions =
        application.getPreQuestions().stream().map(QuestionResponse::from).toList();

    return ApplicationFormResponse.builder()
        .id(application.getId())
        .preQuestions(preQuestions)
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestionTypes(application.getPersonalInfoQuestionTypes())
        .build();
  }
}
