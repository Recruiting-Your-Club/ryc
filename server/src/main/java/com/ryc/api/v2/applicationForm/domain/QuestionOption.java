package com.ryc.api.v2.applicationForm.domain;

import com.ryc.api.v2.applicationForm.presentation.request.QuestionOptionCreateRequest;
import com.ryc.api.v2.applicationForm.presentation.request.QuestionOptionUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class QuestionOption {
  private final String id;
  private final String option;

  @Builder
  private QuestionOption(String id, String option) {

    // 1. 정제
    String sanitizedOption = DataResolveUtil.sanitizeString(option);

    // 2. 검증
    QuestionOptionValidator.validate(id, sanitizedOption);

    // 3. 할당
    this.id = id;
    this.option = sanitizedOption;
  }

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
