package com.ryc.api.v2.auth.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.auth.domain.AdminDefaultRole;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "admins")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AdminEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String name;

  @Column(unique = true)
  private String email;

  private String password;
  private String imageUrl;
  private String thumbnailUrl;

  @Enumerated(EnumType.STRING)
  private AdminDefaultRole adminDefaultRole;

  private Boolean deleted;
}
