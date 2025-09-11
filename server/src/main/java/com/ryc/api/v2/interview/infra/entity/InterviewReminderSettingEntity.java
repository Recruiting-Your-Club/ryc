package com.ryc.api.v2.interview.infra.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "interview_reminder_settings")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class InterviewReminderSettingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String announcementId;

  private int relativeHour;
}
