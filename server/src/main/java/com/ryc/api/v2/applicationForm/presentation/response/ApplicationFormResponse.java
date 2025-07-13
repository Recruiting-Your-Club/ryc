package com.ryc.api.v2.applicationForm.presentation.response;

import java.util.List;

import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationFormResponse(
    @Schema(description = "지원서 질문") List<QuestionResponse> applicationQuestions,
    @Schema(description = "사전 질문") List<QuestionResponse> preQuestions,
    @Schema(description = "개인정보 질문", example = "[\"NAME\", \"EMAIL\"]")
        List<PersonalInfoQuestionType> personalInfoQuestions) {
  public static ApplicationFormResponse from(ApplicationForm application) {
    List<QuestionResponse> applicationQuestions =
        application.getApplicationQuestions().stream().map(QuestionResponse::from).toList();
    List<QuestionResponse> preQuestions =
        application.getPreQuestions().stream().map(QuestionResponse::from).toList();

    return ApplicationFormResponse.builder()
        .preQuestions(preQuestions)
        .applicationQuestions(applicationQuestions)
        .personalInfoQuestions(application.getPersonalInfoQuestionTypes())
        .build();
  }
}
