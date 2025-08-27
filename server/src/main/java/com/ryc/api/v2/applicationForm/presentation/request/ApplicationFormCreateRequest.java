package com.ryc.api.v2.applicationForm.presentation.request;

import java.util.List;

import jakarta.validation.Valid;
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
public record ApplicationFormCreateRequest(
    @NotEmpty(message = "지원자에게 필수로 받을 개인정보 타입 리스트는 빈값일 수 없습니다.")
        List<@NotNull(message = "각 개인정보 타입은 null일 수 없습니다.") PersonalInfoQuestionType>
            personalInfoQuestionTypes,
    List<@NotNull(message = "각 사전질문은 null 일 수 없습니다.") @Valid QuestionCreateRequest> preQuestions,
    List<@NotNull(message = "각 질문은 null 일 수 없습니다.") @Valid QuestionCreateRequest>
        applicationQuestions) {

  @Override
  public List<QuestionCreateRequest> preQuestions() {
    return List.copyOf(preQuestions);
  }

  @Override
  public List<QuestionCreateRequest> applicationQuestions() {
    return List.copyOf(applicationQuestions);
  }

  @Override
  @Schema(description = "개인정보 질문", example = "[\"NAME\", \"EMAIL\"]")
  public List<PersonalInfoQuestionType> personalInfoQuestionTypes() {
    return List.copyOf(personalInfoQuestionTypes);
  }
}
