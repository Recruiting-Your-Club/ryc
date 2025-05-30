package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * @param personalInfoQuestionTypes 인적 사항
 * @param preQuestions 사전 질문
 * @param applicationQuestions 지원서 질문
 * @brief 공고 지원서 request Dto
 */
public record AnnouncementApplicationRequest(
    @Schema(description = "인적 사항", defaultValue = "[NAME,EMAIL]", example = "[NAME,EMAIL]")
        @NotNull(message = "personalInfoQuestionTypes shouldn't be null")
        List<PersonalInfoQuestionType> personalInfoQuestionTypes,
    @NotNull(message = "preQuestions shouldn't be null")
        List<ApplicationQuestionRequest> preQuestions,
    @NotNull(message = "applicationQuestions shouldn't be null")
        List<ApplicationQuestionRequest> applicationQuestions) {
  public List<ApplicationQuestionRequest> preQuestions() {
    return List.copyOf(preQuestions);
  }

  public List<ApplicationQuestionRequest> applicationQuestions() {
    return List.copyOf(applicationQuestions);
  }

  public List<PersonalInfoQuestionType> personalInfoQuestionTypes() {
    return List.copyOf(personalInfoQuestionTypes);
  }
}
