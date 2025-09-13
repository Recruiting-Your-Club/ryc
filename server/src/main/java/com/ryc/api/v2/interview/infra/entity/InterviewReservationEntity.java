package com.ryc.api.v2.interview.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.applicant.infra.entity.ApplicantEntity;
import com.ryc.api.v2.common.infra.entity.BaseEntity;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.*;

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

  @Enumerated(EnumType.STRING)
  @Column(name = "reminder_status", nullable = false)
  @Builder.Default
  private EmailSentStatus reminderStatus = EmailSentStatus.PENDING;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "interview_slot_id", nullable = false)
  private InterviewSlotEntity interviewSlot;
}
