package com.ryc.api.v2.applicant.domain;

import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class Applicant {

  private final String id;
  private final String name;
  private final String email;

  // TODO: 지원서와 연관관계 필요

  /**
   * 지원자(Applicant) 도메인을 생성하기 위한 정적 팩토리 메서드. 최초 생성 시에만 사용되며, 이후 상태 변경이나 업데이트 용도로는 사용하지 않는다.
   *
   * @return {@link Applicant} 도메인 객체
   */
  public static Applicant initialize() {
    Applicant applicant = Applicant.builder().id(DomainDefaultValues.DEFAULT_INITIAL_ID).build();

    applicant.validate();
    return applicant;
  }

  public void validate() {}
}
