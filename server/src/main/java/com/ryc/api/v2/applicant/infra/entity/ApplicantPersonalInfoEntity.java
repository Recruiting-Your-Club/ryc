package com.ryc.api.v2.applicant.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;

import lombok.*;

@Entity
@Table(name = "applicant_personal_infos")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApplicantPersonalInfoEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Enumerated(EnumType.STRING)
  private PersonalInfoQuestionType questionType;

  private String value;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "applicant_id", nullable = false)
  @Setter
  private ApplicantEntity applicant;
}
