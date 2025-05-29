package com.ryc.api.v2.announcement.presentation.dto.request;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;

/**
 * @param questionType 질문타입
 * @param label 질문
 * @param isRequired 필수사항
 * @param options (optional)선지
 * @brief 지원서 질문 Request Dto
 */
public record ApplicationQuestionRequest(
    @NotNull(message = "questionType shouldn't be null") QuestionType questionType,
    @NotBlank(message = "label shouldn't be blank") String label,
    @NotNull(message = "isRequired shouldn't be null") boolean isRequired,
    List<@NotBlank(message = "option shouldn't be blank") String> options) {
  public List<String> options() {
    return List.copyOf(options);
  }
}
