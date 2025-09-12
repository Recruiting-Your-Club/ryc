package com.ryc.api.v2.email.infra.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "interview_reminder_infos")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class InterviewReminderInfoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String announcementId;

  private int relativeHour;

  @Builder.Default
  @OneToMany(
      mappedBy = "reminderInfo",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.LAZY)
  private List<InterviewReminderQueueEntity> reminderQueues = new ArrayList<>();

  public void addReminderQueue(InterviewReminderQueueEntity reminderQueue) {
    reminderQueue.setReminderInfo(this);
    this.reminderQueues.add(reminderQueue);
  }
}
