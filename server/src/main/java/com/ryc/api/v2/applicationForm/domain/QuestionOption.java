package com.ryc.api.v2.applicationForm.domain;

import com.ryc.api.v2.applicationForm.presentation.request.QuestionOptionCreateRequest;
import com.ryc.api.v2.applicationForm.presentation.request.QuestionOptionUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionOption {
  private String id;
  private String option;

  /**
   * create 메소드
   *
   * @param request createRequest
   */
  public static QuestionOption initialize(QuestionOptionCreateRequest request) {
    return QuestionOption.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .option(request.option())
        .build();
  }

  /**
   * update 메소드
   *
   * @param request updateRequest
   */
  public static QuestionOption from(QuestionOptionUpdateRequest request) {
    return QuestionOption.builder().id(request.id()).option(request.option()).build();
  }
}
