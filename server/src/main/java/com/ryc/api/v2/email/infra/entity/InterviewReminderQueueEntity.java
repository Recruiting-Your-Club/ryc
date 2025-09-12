package com.ryc.api.v2.email.infra.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.ryc.api.v2.email.domain.enums.EmailSentStatus;
import com.ryc.api.v2.interview.infra.entity.InterviewSlotEntity;

import lombok.*;

@Entity
@Table(name = "interview_reminder_queues")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class InterviewReminderQueueEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String applicantEmail;

  @Column(nullable = false)
  private EmailSentStatus status;

  @Column(nullable = false)
  private LocalDateTime reminderDateTime;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "reminder_info_id", nullable = false)
  private InterviewReminderInfoEntity reminderInfo;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "interview_slot_id", nullable = false)
  private InterviewSlotEntity interviewSlot;
}
