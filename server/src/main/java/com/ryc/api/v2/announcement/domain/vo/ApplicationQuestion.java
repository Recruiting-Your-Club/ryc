package com.ryc.api.v2.announcement.domain.vo;

import java.util.List;

import com.ryc.api.v2.announcement.domain.enums.QuestionType;
import com.ryc.api.v2.announcement.presentation.dto.request.ApplicationQuestionRequest;

import lombok.Builder;

/**
 * @param type
 * @param label
 * @param isRequired
 * @param options
 * @brief 지원서 질문 pojo 객체
 */
@Builder
public record ApplicationQuestion(
    QuestionType type, String label, boolean isRequired, List<String> options) {
  /**
   * @param questionRequest requestDto
   * @return ApplicationQuestion
   * @brief 지원서 질문 생성(최초 생성시만)
   */
  public static ApplicationQuestion initialize(ApplicationQuestionRequest questionRequest) {

    return ApplicationQuestion.builder()
        .type(QuestionType.LONG_ANSWER)
        .label(questionRequest.label())
        .isRequired(questionRequest.isRequired())
        .options(questionRequest.options())
        .build();
  }

  /**
   * @return 주관식 - options.isEmpty() 객관식 - options.size() > 1
   */
  public Boolean isValid() {
    if (type.equals(QuestionType.LONG_ANSWER)
        || type.equals(QuestionType.SHORT_ANSWER)
        || type.equals(QuestionType.FILE)) {
      if (!options.isEmpty()) {
        throw new IllegalArgumentException(
            "LongAnswer, ShortAnswer, File type question options shouldn't be empty");
      }
      return true;
    }
    if (options.size() < 2) {
      throw new IllegalArgumentException(
          "MultipleChoice, SingleChoice type question options shouldn't be empty");
    }
    return true;
  }
}
