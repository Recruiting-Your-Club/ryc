package com.ryc.api.v2.role.infra.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@EntityListeners(AuditingEntityListener.class)
public class InviteEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String clubId;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  private LocalDateTime expiresAt;
}
