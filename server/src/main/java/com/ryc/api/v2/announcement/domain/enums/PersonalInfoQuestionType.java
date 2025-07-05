package com.ryc.api.v2.announcement.domain.enums;

import lombok.Getter;

@Getter
public enum PersonalInfoQuestionType {
  STUDENT_ID(InputType.TEXT),
  PHONE_NUMBER(InputType.TEXT),
  PROFILE_IMAGE(InputType.FILE),
  NAME(InputType.TEXT),
  EMAIL(InputType.TEXT);

  private final InputType inputType;

  PersonalInfoQuestionType(InputType inputType) {
    this.inputType = inputType;
  }
}
