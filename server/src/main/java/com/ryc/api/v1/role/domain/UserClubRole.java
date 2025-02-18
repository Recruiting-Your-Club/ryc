package com.ryc.api.v1.role.domain;

import jakarta.persistence.*;

import com.ryc.api.v1.club.domain.Club;
import com.ryc.api.v1.common.entity.BaseEntity;
import com.ryc.api.v1.user.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "club_id", "role"})})
public class UserClubRole extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "user_club_role_id")
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private Club club;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private User user;

  @Enumerated(EnumType.STRING)
  @Column(name = "role")
  private ClubRole clubRole;

  private Boolean deleted;

  protected UserClubRole() {
    super();
  }
}
