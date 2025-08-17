package com.ryc.api.v2.application.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.ryc.api.v2.application.common.exception.code.ApplicationCreateErrorCode;
import com.ryc.api.v2.application.presentation.dto.request.ApplicationCreateRequest;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.domain.Question;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Application {
  private final String id;
  private final String applicantId;
  private final List<Answer> answers;
  private final LocalDateTime createdAt;

  @Builder
  private Application(
      String id,
      String applicantId,
      List<Answer> answers,
      LocalDateTime createdAt) {

    ApplicationValidator.ValidatedApplication validated =
        ApplicationValidator.validateAndSanitize(id, applicantId, answers, createdAt);

    this.id = validated.id();
    this.applicantId = validated.applicantId();
    this.answers = validated.answers();
    this.createdAt = validated.createdAt();
  }

  public static Application initialize(ApplicationCreateRequest request, String applicantId) {
    List<Answer> answers = request.answers().stream().map(Answer::initialize).toList();

    return Application.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .applicantId(applicantId)
        .answers(answers)
        .build();
  }

  public void checkBusinessRules(ApplicationForm applicationForm) {
    Map<String, Question> questionMap =
        Stream.concat(
                applicationForm.getApplicationQuestions().stream(),
                applicationForm.getPreQuestions().stream())
            .collect(Collectors.toMap(Question::getId, Function.identity()));

    for (Question question : questionMap.values()) {
      if (question.isRequired()) {
        answers.stream()
            .filter(answer -> answer.getQuestionId().equals(question.getId()))
            .findAny()
            .orElseThrow(
                () ->
                    new BusinessRuleException(ApplicationCreateErrorCode.MISSING_REQUIRED_ANSWER));
      }
    }

    for (Answer answer : answers) {
      Question question = questionMap.get(answer.getQuestionId());
      if (question == null) {
        throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_QUESTION_ID);
      }
      answer.checkBusinessRules(question);
    }
  }
}
