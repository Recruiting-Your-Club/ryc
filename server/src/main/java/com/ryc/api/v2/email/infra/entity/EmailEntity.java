package com.ryc.api.v2.email.infra.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "emails")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EmailEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String recipient;

  @Column(nullable = false)
  private String subject;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(nullable = false)
  private String announcementId;

  @Column(nullable = false)
  private String adminEmail;
}
