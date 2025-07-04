package com.ryc.api.v2.announcement.presentation.dto.response;

import java.util.List;

import com.ryc.api.v2.announcement.domain.ApplicationForm;
import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
public record ApplicationFormResponse(
    @Schema(description = "지원서 질문") List<ApplicationQuestionResponse> applicationQuestions,
    @Schema(description = "사전 질문") List<ApplicationQuestionResponse> preQuestions,
    @Schema(description = "개인정보 질문", example = "[\"NAME\", \"EMAIL\"]")
        List<PersonalInfoQuestionType> personalInfoQuestions) {
  public static ApplicationFormResponse from(ApplicationForm application) {
    List<ApplicationQuestionResponse> applicationQuestions =
        application.getApplicationQuestions().stream()
            .map(ApplicationQuestionResponse::from)
            .toList();
    List<ApplicationQuestionResponse> preQuestions =
        application.getPreQuestions().stream().map(ApplicationQuestionResponse::from).toList();

    return ApplicationFormResponse.builder()
        .applicationQuestions(applicationQuestions)
        .preQuestions(preQuestions)
        .personalInfoQuestions(application.getPersonalInfoQuestionTypes())
        .build();
  }
}
