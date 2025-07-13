package com.ryc.api.v2.applicationForm.domain;

import java.util.List;

import com.ryc.api.v2.applicationForm.domain.enums.QuestionCategory;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;
import com.ryc.api.v2.applicationForm.presentation.request.QuestionCreateRequest;
import com.ryc.api.v2.applicationForm.presentation.request.QuestionUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.code.ErrorCode;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Question {
  private final String id;
  private final String label;
  private boolean isRequired;

  private final List<QuestionOption> options;

  private final QuestionType questionType;
  private final QuestionCategory category;

  public static Question initialize(QuestionCreateRequest request, QuestionCategory category) {
    List<QuestionOption> options =
        request.options().stream().map(QuestionOption::initialize).toList();

    return Question.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .label(request.label())
        .isRequired(request.isRequired())
        .questionType(request.questionType())
        .options(options)
        .category(category)
        .build();
  }

  public static Question of(QuestionUpdateRequest request, QuestionCategory category) {
    List<QuestionOption> options = request.options().stream().map(QuestionOption::from).toList();
    return Question.builder()
        .id(request.id())
        .label(request.label())
        .isRequired(request.isRequired())
        .questionType(request.questionType())
        .options(options)
        .category(category)
        .build();
  }

  public void checkBusinessRules(List<ErrorCode> errors) {}
}
