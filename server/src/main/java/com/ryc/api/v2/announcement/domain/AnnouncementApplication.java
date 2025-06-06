package com.ryc.api.v2.announcement.domain;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.ryc.api.v2.announcement.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.announcement.domain.vo.ApplicationQuestion;
import com.ryc.api.v2.announcement.presentation.dto.request.AnnouncementApplicationRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AnnouncementApplication {
  private final String id;

  private List<ApplicationQuestion> applicationQuestions;
  private List<PersonalInfoQuestionType> personalInfoQuestionTypes;
  private List<ApplicationQuestion> preQuestions;

  /**
   * @param request create request
   * @return AnnouncementApplication domain
   * @brief 최초 생성시에만 사용되는 정적 팩토리 메소드
   */
  public static AnnouncementApplication initialize(AnnouncementApplicationRequest request) {
    List<ApplicationQuestion> applicationQuestions =
        request.applicationQuestions().stream().map(ApplicationQuestion::initialize).toList();

    List<ApplicationQuestion> preQuestions =
        request.preQuestions().stream().map(ApplicationQuestion::initialize).toList();

    return AnnouncementApplication.builder()
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
  public AnnouncementApplication update(AnnouncementApplicationRequest request) {
    List<ApplicationQuestion> applicationQuestions =
        request.applicationQuestions().stream().map(ApplicationQuestion::initialize).toList();

    List<ApplicationQuestion> preQuestions =
        request.preQuestions().stream().map(ApplicationQuestion::initialize).toList();

    return AnnouncementApplication.builder()
        .id(this.id)
        .applicationQuestions(List.copyOf(applicationQuestions))
        .personalInfoQuestionTypes(request.personalInfoQuestionTypes())
        .preQuestions(List.copyOf(preQuestions))
        .build();
  }

  /**
   * @brief 유효 객체 검사.
   */
  public void validate() {
    validatePersonalInfoQuestionTypes();

    // 각 ApplicationQuestion 객체의 validate
    for (ApplicationQuestion question : applicationQuestions) {
      question.validate();
    }

    // 각 preQuestion 객체의 validate
    for (ApplicationQuestion question : preQuestions) {
      question.validate();
    }
  }

  /**
   * 필수 개인정보 질문 타입(이름, 이메일)이 포함되어 있는지 검증
   *
   * @throws IllegalArgumentException 필수 개인정보 질문 타입이 없는 경우
   */
  private void validatePersonalInfoQuestionTypes() {
    // 1. 필수 개인정보 질문 타입(이름, 이메일)
    Set<PersonalInfoQuestionType> requiredTypes =
        Set.of(PersonalInfoQuestionType.NAME, PersonalInfoQuestionType.EMAIL);

    // 2. 제공된 개인정보 질문 타입
    Set<PersonalInfoQuestionType> providedTypes = new HashSet<>(personalInfoQuestionTypes);

    // 3. 필수 개인정보 질문 타입이 포함되어있는지 확인
    if (!providedTypes.containsAll(requiredTypes)) {
      throw new IllegalArgumentException("personalInfoQuestionTypes must contain NAME and EMAIL");
    }
  }
}
