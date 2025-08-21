package com.ryc.api.v2.interview.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.time.LocalDateTime;

import com.ryc.api.v2.common.validator.DomainValidator;

final class NumberOfPeopleByInterviewDateValidator extends DomainValidator {

  private NumberOfPeopleByInterviewDateValidator() {}

  private static final int MIN_NUMBER_OF_PEOPLE = 0;
  private static final int MAX_NUMBER_OF_PEOPLE = 1000;

  static void validate(LocalDateTime interviewDate, Integer numberOfPeople) {
    validateInterviewDate(interviewDate);
    validateNumberOfPeople(numberOfPeople);
  }

  private static void validateInterviewDate(LocalDateTime interviewDate) {
    validateNotNull(interviewDate, NUMBER_OF_PEOPLE_BY_INTERVIEW_DATE_INTERVIEW_DATE_NULL);
  }

  private static void validateNumberOfPeople(Integer numberOfPeople) {
    validateNotNull(numberOfPeople, NUMBER_OF_PEOPLE_BY_INTERVIEW_DATE_NUMBER_OF_PEOPLE_NULL);
    validateIntRange(
        numberOfPeople,
        MIN_NUMBER_OF_PEOPLE,
        MAX_NUMBER_OF_PEOPLE,
        NUMBER_OF_PEOPLE_BY_INTERVIEW_DATE_INVALID_NUMBER_OF_PEOPLE_RANGE);
  }
}
