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
public class Answer {
  private final String id;
  private final String questionId;
  private final String textAnswer;
  private final List<AnswerChoice> choices;
  private final String fileMetadataId;

  @Builder
  private Answer(
      String id,
      String questionId,
      String textAnswer,
      List<AnswerChoice> choices,
      String fileMetadataId) {

    AnswerValidator.ValidatedAnswer validated =
        AnswerValidator.validateAndSanitize(id, questionId, textAnswer, choices, fileMetadataId);

    this.id = validated.id();
    this.questionId = validated.questionId();
    this.textAnswer = validated.textAnswer();
    this.choices = validated.choices();
    this.fileMetadataId = validated.fileMetadataId();
  }

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
      case LONG_ANSWER, SHORT_ANSWER -> validateTextAnswer(question.isRequired());
      case SINGLE_CHOICE -> validateSingleChoiceAnswer(question.isRequired());
      case MULTIPLE_CHOICE -> validateMultipleChoiceAnswer(question.isRequired());
      case FILE -> validateFileAnswer(question.isRequired());
    }
  }

  /** 주관식 질문 응답객체 validation */
  private void validateTextAnswer(Boolean isRequired) {
    // textAnswer외에 다른 입력값이 들어간 경우
    if (!choices.isEmpty() || fileMetadataId != null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }

    // 필수 입력값인데 비어있는 경우
    if (isRequired && textAnswer == null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }

  /** 단일 선택 질문 응답객체 validation */
  private void validateSingleChoiceAnswer(Boolean isRequired) {
    // choices외에 다른 입력값이 들어온 경우
    if (textAnswer != null || fileMetadataId != null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }

    // 필수 입력값인데 올바른 입력값이 아닌경우 (단일 선택)
    if (isRequired && choices.size() != 1) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }

  /** 다중 선택 질문 응답객체 validation */
  private void validateMultipleChoiceAnswer(Boolean isRequired) {
    if (textAnswer != null || fileMetadataId != null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }

    // 필수 입력값인데 올바른 입력값이 아닌경우 (다중 선택)
    if (isRequired && choices.isEmpty()) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }

  /** 파일 질문 응답객체 validation */
  private void validateFileAnswer(Boolean isRequired) {
    if (textAnswer != null || !choices.isEmpty()) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }

    // 필수 입력값인데 비어있는 경우
    if (isRequired && fileMetadataId == null) {
      throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_ANSWER_FORMAT);
    }
  }
}
