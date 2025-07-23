package com.ryc.api.v2.application.domain;

import java.util.List;

import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.presentation.dto.request.AnswerCreateRequest;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Answer {
  private final String id;
  private final String questionId;
  private final String textAnswer;
  private final List<AnswerChoice> choices;
  private final String fileMetadataId;

  public static Answer initialize(AnswerCreateRequest request) {
    List<AnswerChoice> choices =
        request.answerChoices().stream().map(AnswerChoice::initialize).toList();

    return Answer.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .questionId(request.questionId())
        .textAnswer(request.textAnswer())
        .choices(choices)
        .fileMetadataId(request.fileMetadataId())
        .build();
  }

  public void checkBusinessRules(Question question) {
    switch (question.getQuestionType()) {
      case LONG_ANSWER, SHORT_ANSWER -> validateTextAnswer();
      case SINGLE_CHOICE -> validateSingleChoiceAnswer();
      case MULTIPLE_CHOICE -> validateMultipleChoiceAnswer();
      case FILE -> validateFileAnswer();
    }
  }

  /** 주관식 질문 응답객체 validation */
  private void validateTextAnswer() {
    if (textAnswer == null
        || textAnswer.isBlank()
        || !choices.isEmpty()
        || fileMetadataId != null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }

  /** 단일 선택 질문 응답객체 validation */
  private void validateSingleChoiceAnswer() {
    if (choices.size() != 1 || textAnswer != null || fileMetadataId != null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }

  /** 다중 선택 질문 응답객체 validation */
  private void validateMultipleChoiceAnswer() {
    if (choices.isEmpty() || textAnswer != null || fileMetadataId != null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }

  /** 파일 질문 응답객체 validation */
  private void validateFileAnswer() {
    if (fileMetadataId == null
        || fileMetadataId.isBlank()
        || textAnswer != null
        || !choices.isEmpty()) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }
}
