package com.ryc.api.v2.applicationForm.domain;

import java.util.List;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionCategory;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionType;
import com.ryc.api.v2.applicationForm.presentation.request.QuestionCreateRequest;
import com.ryc.api.v2.applicationForm.presentation.request.QuestionUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Question {
  private final String id;
  private final String label;
  private final String description;
  private final boolean isRequired;

  private final List<QuestionOption> options;

  private final QuestionType questionType;
  private final QuestionCategory category;

  @Builder
  private Question(
      String id,
      String label,
      String description,
      boolean isRequired,
      List<QuestionOption> options,
      QuestionType questionType,
      QuestionCategory category) {

    // 1. 정제
    String sanitizedLabel = DataResolveUtil.sanitizeString(label);
    String sanitizedDescription = DataResolveUtil.sanitizeString(description);

    // 2. 선택 멤버 변수 기본값 처리
    List<QuestionOption> resolvedOptions = options != null ? options : List.of();

    // 3. 검증
    QuestionValidator.validate(
        id,
        sanitizedLabel,
        sanitizedDescription,
        isRequired,
        resolvedOptions,
        questionType,
        category);

    // 4. 할당
    this.id = id;
    this.label = sanitizedLabel;
    this.description = sanitizedDescription;
    this.isRequired = isRequired;
    this.options = resolvedOptions;
    this.questionType = questionType;
    this.category = category;
  }

  public static Question initialize(QuestionCreateRequest request, QuestionCategory category) {
    List<QuestionOption> options =
        request.options().stream().map(QuestionOption::initialize).toList();

    return Question.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .label(request.label())
        .description(request.description())
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
        .description(request.description())
        .isRequired(request.isRequired())
        .questionType(request.questionType())
        .options(options)
        .category(category)
        .build();
  }

  /** Business Rule 체크 */
  public void checkBusinessRules() {
    // QUESTION -> LONG_ANSWER 카테고리만 가능
    // PRE_QUESTION -> LONG_ANSWER 카테고리외에 가능
    if (category.equals(QuestionCategory.QUESTION)
        && !questionType.equals(QuestionType.LONG_ANSWER)) {
      throw new BusinessRuleException(AnnouncementErrorCode.INVALID_QUESTION_TYPE);
    } else if (category.equals(QuestionCategory.PRE_QUESTION)
        && questionType.equals(QuestionType.LONG_ANSWER)) {
      throw new BusinessRuleException(AnnouncementErrorCode.INVALID_QUESTION_TYPE);
    }

    // 주관식, 객관식 선지
    if (isChoiceQuestion() && options.size() < 2) {
      throw new BusinessRuleException(AnnouncementErrorCode.QUESTION_OPTION_REQUIRED);
    } else if (!isChoiceQuestion() && !options.isEmpty()) {
      throw new BusinessRuleException(AnnouncementErrorCode.QUESTION_OPTION_NOT_ALLOWED);
    }
  }

  public boolean isChoiceQuestion() {
    return this.questionType.equals(QuestionType.MULTIPLE_CHOICE)
        || this.questionType.equals(QuestionType.SINGLE_CHOICE);
  }
}
