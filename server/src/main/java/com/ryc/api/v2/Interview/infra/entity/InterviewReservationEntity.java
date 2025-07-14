package com.ryc.api.v2.Interview.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interview_reservations")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class InterviewReservationEntity extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "applicant_id", nullable = false)
  private ApplicantEntity applicant;

  @Column(nullable = false)
  private String interviewSlotId;
}
