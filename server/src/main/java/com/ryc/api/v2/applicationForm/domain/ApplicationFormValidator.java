package com.ryc.api.v2.applicationForm.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.List;
import java.util.regex.Pattern;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
import com.ryc.api.v2.common.validator.DomainValidator;

/** 유효성(Validation) 검사 Util 클래스 접근 제한자 package-private 준수 */
final class ApplicationFormValidator extends DomainValidator {

  private ApplicationFormValidator() {}

  /** 유효성 검증 규칙 (Validation Rules) */
  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  /** 유효성 검증 진입점 접근 제한자 private-package 준수 순수 검증만 담당 */
  static void validate(
      String id,
      List<Question> applicationQuestions,
      List<PersonalInfoQuestionType> personalInfoQuestionTypes,
      List<Question> preQuestions) {

    // 공통 검증 메소드 사용
    validateId(id);
    validateApplicationQuestions(applicationQuestions);
    validatePersonalInfoQuestionTypes(personalInfoQuestionTypes);
    validatePreQuestions(preQuestions);
  }

  /** 검증 private 헬퍼 메소드 */

  /** UUID 포멧 준수 */
  private static void validateId(String id) {
    validateNotNullOrEmpty(id, APPLICATION_FORM_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, APPLICATION_FORM_INVALID_ID_FORMAT);
  }

  private static void validateApplicationQuestions(List<Question> applicationQuestions) {
    validateNotNull(applicationQuestions, APPLICATION_FORM_APPLICATION_QUESTIONS_NULL);
  }

  private static void validatePersonalInfoQuestionTypes(List<PersonalInfoQuestionType> personalInfoQuestionTypes) {
    validateNotNull(personalInfoQuestionTypes, APPLICATION_FORM_PERSONAL_INFO_QUESTION_TYPES_NULL);
  }

  private static void validatePreQuestions(List<Question> preQuestions) {
    validateNotNull(preQuestions, APPLICATION_FORM_PRE_QUESTIONS_NULL);
  }
}