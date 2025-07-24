package com.ryc.api.v2.applicationForm.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ryc.api.v2.announcement.common.exception.code.AnnouncementErrorCode;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.applicationForm.domain.enums.QuestionCategory;
import com.ryc.api.v2.applicationForm.presentation.request.ApplicationFormCreateRequest;
import com.ryc.api.v2.applicationForm.presentation.request.ApplicationFormUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ApplicationForm {
  private final String id;

  private List<Question> applicationQuestions;
  private List<PersonalInfoQuestionType> personalInfoQuestionTypes;
  private List<Question> preQuestions;

  /**
   * @param request create request
   * @return AnnouncementApplication domain
   * @brief 최초 생성시에만 사용되는 정적 팩토리 메소드
   */
  public static ApplicationForm initialize(ApplicationFormCreateRequest request) {
    List<Question> applicationQuestions =
        request.applicationQuestions().stream()
            .map(r -> Question.initialize(r, QuestionCategory.QUESTION))
            .toList();

    List<Question> preQuestions =
        request.preQuestions().stream()
            .map(r -> Question.initialize(r, QuestionCategory.PRE_QUESTION))
            .toList();

    return ApplicationForm.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .applicationQuestions(List.copyOf(applicationQuestions))
        .personalInfoQuestionTypes(request.personalInfoQuestionTypes())
        .preQuestions(List.copyOf(preQuestions))
        .build();
  }

  /**
   * update Request를 받아 새로운 객체로 Update
   *
   * @param request
   */
  public static ApplicationForm from(ApplicationFormUpdateRequest request) {
    List<Question> questions =
        request.applicationQuestions().stream()
            .map(q -> Question.of(q, QuestionCategory.QUESTION))
            .toList();

    List<Question> preQuestions =
        request.preQuestions().stream()
            .map(q -> Question.of(q, QuestionCategory.PRE_QUESTION))
            .toList();

    return ApplicationForm.builder()
        .id(request.id())
        .applicationQuestions(questions)
        .preQuestions(preQuestions)
        .personalInfoQuestionTypes(request.personalInfoQuestionTypes())
        .build();
  }

  /**
   * @brief 유효 객체 검사.
   */
  public void checkBusinessRules() {
    validatePersonalInfoQuestionTypes();

    // 각 ApplicationQuestion 객체의 validate
    for (Question question : applicationQuestions) {
      question.checkBusinessRules();
    }

    // 각 preQuestion 객체의 validate
    for (Question question : preQuestions) {
      question.checkBusinessRules();
    }
  }

  /**
   * 필수 개인정보 질문 타입(이름, 이메일)이 포함되어 있는지 검증
   *
   * @throws
   */
  private void validatePersonalInfoQuestionTypes() {
    // 1. 필수 개인정보 질문 타입(이름, 이메일)
    Set<PersonalInfoQuestionType> requiredTypes =
        Set.of(PersonalInfoQuestionType.NAME, PersonalInfoQuestionType.EMAIL);

    // 2. 제공된 개인정보 질문 타입
    Set<PersonalInfoQuestionType> providedTypes = new HashSet<>(personalInfoQuestionTypes);

    // 3. 필수 개인정보 질문 타입이 포함되어있는지 확인
    if (!providedTypes.containsAll(requiredTypes)) {
      throw new BusinessRuleException(AnnouncementErrorCode.MISSING_REQUIRED_PERSONAL_INFO);
    }
  }
}
