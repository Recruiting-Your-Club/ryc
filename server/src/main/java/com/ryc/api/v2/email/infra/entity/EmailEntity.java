package com.ryc.api.v2.email.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.infra.entity.BaseEntity;
import com.ryc.api.v2.email.domain.enums.EmailSentStatus;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "emails")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EmailEntity extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String senderId;

  @Column(nullable = false)
  private String recipient;

  @Column(nullable = false)
  private String subject;

  @Column(columnDefinition = "TEXT", nullable = false)
  private String content;

  @Column(nullable = false)
  private String announcementId;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private EmailSentStatus status;

  @Column(nullable = false)
  @Builder.Default
  private Integer retryCount = 0;
}
