package com.ryc.api.v2.role.domain.vo;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.role.domain.enums.Role;

import lombok.Builder;

public record ClubRole(
    String id,
    Role role,
    Club club,
    Admin admin,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  // TODO: 비즈니스 로직에 쓰이지 않는 createdAt, updatedAt 도메인 레이어에 필요 없어 보임.
  @Builder
  public ClubRole {
    ClubRoleValidator.validate(id, role, club, admin, createdAt, updatedAt);
  }

  public static ClubRole initialize(Club club, Admin admin, Role role) {
    return ClubRole.builder().id(DEFAULT_INITIAL_ID).club(club).admin(admin).role(role).build();
  }
}
