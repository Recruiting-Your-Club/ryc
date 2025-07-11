package com.ryc.api.v2.evaluation.infra.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "evaluations")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EvaluationEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "admin_id")
  private AdminEntity adminEntity;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "applicant_id")
  private ApplicantEntity applicantEntity;

  // TODO: BigDecimal -> DB 매핑 타입
  private BigDecimal score;
  private String comment;

  private Boolean deleted;
}
