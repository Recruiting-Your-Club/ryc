package com.ryc.api.v2.evaluation.infra.entity;

import java.math.BigDecimal;

import jakarta.persistence.*;

import com.ryc.api.v2.admin.infra.entity.AdminEntity;
import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.common.infra.entity.BaseEntity;
import com.ryc.api.v2.evaluation.domain.EvaluationType;

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

  @Column(precision = 2, scale = 1)
  private BigDecimal score;

  private String comment;

  @Enumerated(EnumType.STRING)
  private EvaluationType type;
}
