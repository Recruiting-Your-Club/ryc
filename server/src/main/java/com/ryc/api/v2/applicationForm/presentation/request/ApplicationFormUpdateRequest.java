package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import io.swagger.v3.oas.annotations.media.Schema;

/**
 * @param personalInfoQuestionTypes 인적 사항
 * @param preQuestions 사전 질문
 * @param applicationQuestions 지원서 질문
 * @brief 공고 지원서 request Dto
 */
@Schema(description = "공고 지원서")
public record ApplicationFormUpdateRequest(
    @NotBlank(message = "id shouldn't be blank")
        @Schema(description = "공고 지원서 ID", example = "e23e4567-e89b-12d3-a456-426614174000")
        String id,
    @NotEmpty(message = "personalInfoQuestionTypes shouldn't be empty")
        List<
                @NotNull(message = "personalInfoQuestionType shouldn't be null")
                PersonalInfoQuestionType>
            personalInfoQuestionTypes,
    @NotNull(message = "preQuestions shouldn't be null")
        List<@NotNull(message = "preQuestion shouldn't be null") QuestionUpdateRequest>
            preQuestions,
    @NotNull(message = "applicationQuestions shouldn't be null")
        List<@NotNull(message = "applicationQuestion shouldn't be null") QuestionUpdateRequest>
            applicationQuestions) {
  @Override
  public List<QuestionUpdateRequest> preQuestions() {
    return List.copyOf(preQuestions);
  }

  @Override
  public List<QuestionUpdateRequest> applicationQuestions() {
    return List.copyOf(applicationQuestions);
  }

  @Override
  @Schema(description = "개인정보 질문", example = "[\"NAME\", \"EMAIL\"]")
  public List<PersonalInfoQuestionType> personalInfoQuestionTypes() {
    return List.copyOf(personalInfoQuestionTypes);
  }
}
