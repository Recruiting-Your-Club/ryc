package com.ryc.api.v2.announcement.infra.vo;

import jakarta.persistence.*;

import lombok.*;

/** 공고 기간 정보 데이터베이스 객체 */
@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class AnnouncementPeriodInfoVO {
  @AttributeOverrides({
    @AttributeOverride(
        name = "startDate",
        column = @Column(name = "application_period_start_date")),
    @AttributeOverride(name = "endDate", column = @Column(name = "application_period_end_date"))
  })
  @Embedded
  private PeriodVO applicationPeriodVO;

  @AttributeOverrides({
    @AttributeOverride(name = "startDate", column = @Column(name = "interview_period_start_date")),
    @AttributeOverride(name = "endDate", column = @Column(name = "interview_period_end_date"))
  })
  @Embedded
  private PeriodVO interviewPeriodVO;

  @AttributeOverrides({
    @AttributeOverride(
        name = "startDate",
        column = @Column(name = "final_result_period_start_date")),
    @AttributeOverride(name = "endDate", column = @Column(name = "final_result_period_end_date"))
  })
  @Embedded
  private PeriodVO finalResultPeriodVO;

  @AttributeOverrides({
    @AttributeOverride(
        name = "startDate",
        column = @Column(name = "document_result_period_start_date")),
    @AttributeOverride(name = "endDate", column = @Column(name = "document_result_period_end_date"))
  })
  @Embedded
  private PeriodVO documentResultPeriodVO;
}
