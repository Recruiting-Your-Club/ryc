package com.ryc.api.v1.evaluation.domain;

import java.math.BigDecimal;

import jakarta.persistence.*;

import com.ryc.api.v1.applicant.domain.Applicant;
import com.ryc.api.v1.common.entity.BaseEntity;
import com.ryc.api.v1.evaluation.dto.response.GetEvaluationResponse;
import com.ryc.api.v1.recruitment.domain.Recruitment;
import com.ryc.api.v1.recruitment.domain.Step;
import com.ryc.api.v1.user.domain.User;

import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(
    uniqueConstraints = {
      @UniqueConstraint(columnNames = {"step_id", "applicant_id", "reviewedBy"})
    })
public class Evaluation extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "evaluation_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recruitment_id")
  private Recruitment recruitment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "step_id")
  private Step step;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "applicant_id")
  private Applicant applicant;

  /** 0과 10사이의 최대 소수점 한자리의 실수 */
  @Column(precision = 3, scale = 1)
  private BigDecimal score;

  @Column(columnDefinition = "TEXT")
  private String comment;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reviewedBy")
  private User reviewedBy;

  @Builder.Default private boolean deleted = false;

  public GetEvaluationResponse.EvaluationDto toEvaluationDto() {
    return GetEvaluationResponse.EvaluationDto.builder()
        .evaluatorUserId(this.reviewedBy.getId())
        .evaluatorUserName(this.reviewedBy.getUsername())
        .score(this.score)
        .comment(this.comment)
        .build();
  }
}
