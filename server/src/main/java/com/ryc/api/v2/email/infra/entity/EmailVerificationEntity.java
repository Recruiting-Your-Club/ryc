package com.ryc.api.v2.email.infra.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "email_verifications")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class EmailVerificationEntity {

  @Id private Integer code;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  @Builder.Default
  private Boolean verified = Boolean.FALSE;

  @Column(nullable = false)
  @Builder.Default
  private Boolean attempted = Boolean.FALSE;

  @Column(nullable = false)
  private LocalDateTime expiresAt;
}
