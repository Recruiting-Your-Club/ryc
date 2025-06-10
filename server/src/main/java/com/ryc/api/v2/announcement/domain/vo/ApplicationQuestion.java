package com.ryc.api.v2.announcement.domain.vo;

import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import com.ryc.api.v2.announcement.presentation.dto.request.ApplicationQuestionRequest;

import lombok.Builder;

/**
 * 지원서 질문 Pojo객체
 *
 * @param type 질문 타입
 * @param label 질문 제목
 * @param isRequired 질문 응답 필수 여부
 * @param options (객관식) 보기
 */
@Builder
public record ApplicationQuestion(
    QuestionType type, String label, boolean isRequired, List<String> options) {
  /**
   * 정적 팩토리 메소드
   *
   * @param questionRequest requestDto
   * @return ApplicationQuestion
   */
  public static ApplicationQuestion from(ApplicationQuestionRequest questionRequest) {

    return ApplicationQuestion.builder()
        .type(questionRequest.questionType())
        .label(questionRequest.label())
        .isRequired(questionRequest.isRequired())
        .options(questionRequest.options())
        .build();
  }

  /**
   * @breif 질문 validate
   */
  public void validate() {
    switch (type) {
      case FILE:
      case LONG_ANSWER:
      case SHORT_ANSWER:
        validateOptions(false);
        break;
      case MULTIPLE_CHOICE:
      case SINGLE_CHOICE:
        validateOptions(true);
        break;
    }
  }

  /**
   * @param hasOptions option필요 여부
   * @breif 질문 options validate
   */
  private void validateOptions(Boolean hasOptions) {
    if (hasOptions) {
      if (options.size() < 2) {
        throw new IllegalArgumentException(
            "MultipleChoice, SingleChoice type question options shouldn't be empty");
      }
    } else {
      if (!options.isEmpty()) {
        throw new IllegalArgumentException(
            "LongAnswer, ShortAnswer, File type question options shouldn't be empty");
      }
    }
  }
}
