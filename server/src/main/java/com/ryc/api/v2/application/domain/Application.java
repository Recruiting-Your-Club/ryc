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
@Builder
public class Application {
  private final String id;
  private String applicantId;
  private final List<Answer> answers;
  private final LocalDateTime createdAt;

  public static Application initialize(ApplicationCreateRequest request) {
    List<Answer> answers = request.answers().stream().map(Answer::initialize).toList();

    return Application.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .applicantId(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .answers(answers)
        .build();
  }

  public void validate(ApplicationForm applicationForm) {
    Map<String, Question> questionMap =
        Stream.concat(
                applicationForm.getApplicationQuestions().stream(),
                applicationForm.getPreQuestions().stream())
            .collect(Collectors.toMap(Question::getId, Function.identity()));

    for (Answer answer : answers) {
      Question question = questionMap.get(answer.getQuestionId());
      if (question == null) {
        throw new BusinessRuleException(ApplicationCreateErrorCode.INVALID_QUESTION_ID);
      }
      answer.checkBusinessRules(question);
    }
  }

  public void assignApplicantId(String applicantId) {
    this.applicantId = applicantId;
  }
}
