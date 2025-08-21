package com.ryc.api.v2.interview.domain;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
public class NumberOfPeopleByInterviewDate {

  private final LocalDateTime interviewDate;
  private final Integer numberOfPeople;

  @Builder
  private NumberOfPeopleByInterviewDate(LocalDateTime interviewDate, Integer numberOfPeople) {
    NumberOfPeopleByInterviewDateValidator.validate(interviewDate, numberOfPeople);

    // 4. 할당
    this.interviewDate = interviewDate;
    this.numberOfPeople = numberOfPeople;
  }

  public static NumberOfPeopleByInterviewDate of(
      LocalDateTime interviewDate, Integer numberOfPeople) {
    return NumberOfPeopleByInterviewDate.builder()
        .interviewDate(interviewDate)
        .numberOfPeople(numberOfPeople)
        .build();
  }
}
