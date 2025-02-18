package com.ryc.api.v1.interview.domain;

import jakarta.persistence.*;

import com.ryc.api.v1.user.domain.User;

import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"interview_id", "user_id"})})
public class Interviewer {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "interviewer_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "interview_id")
  private Interview interview;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;
}
