package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * @param personalInfoQuestionTypes 인적 사항
 * @param preQuestions 사전 질문
 * @param applicationQuestions 지원서 질문
 * @brief 공고 지원서 request Dto
 */
@Schema(description = "공고 지원서")
public record AnnouncementApplicationRequest(
    @Schema(implementation = PersonalInfoQuestionType.class, description = "hi", example = "sdsdsd")
        @NotEmpty(message = "personalInfoQuestionTypes shouldn't be empty")
        List<
                @NotNull(message = "personalInfoQuestionType shouldn't be null")
                PersonalInfoQuestionType>
            personalInfoQuestionTypes,
    @NotNull(message = "preQuestions shouldn't be null")
        List<@NotNull(message = "preQuestion shouldn't be null") ApplicationQuestionRequest>
            preQuestions,
    @NotNull(message = "applicationQuestions shouldn't be null")
        List<@NotNull(message = "applicationQuestion shouldn't be null") ApplicationQuestionRequest>
            applicationQuestions) {
  @Override
  public List<ApplicationQuestionRequest> preQuestions() {
    return List.copyOf(preQuestions);
  }

  @Override
  public List<ApplicationQuestionRequest> applicationQuestions() {
    return List.copyOf(applicationQuestions);
  }

  @Override
  public List<PersonalInfoQuestionType> personalInfoQuestionTypes() {
    return List.copyOf(personalInfoQuestionTypes);
  }
}
