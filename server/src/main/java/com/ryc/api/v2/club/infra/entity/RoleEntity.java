package com.ryc.api.v2.club.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.auth.infra.entity.AdminEntity;
import com.ryc.api.v2.club.domain.Role;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "roles")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class RoleEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Enumerated(EnumType.STRING)
  private Role role;

  @ManyToOne
  @JoinColumn(name = "club_id", nullable = false)
  private ClubEntity club;

  @ManyToOne
  @JoinColumn(name = "admin_id", nullable = false)
  private AdminEntity admin;
}
