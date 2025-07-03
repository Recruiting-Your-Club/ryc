package com.ryc.api.v2.role.domain.vo;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import com.ryc.api.v2.auth.domain.Admin;
import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.role.domain.enums.Role;
import com.ryc.api.v2.role.domain.enums.RoleStatus;

import lombok.Builder;

@Builder
public record ClubRole(
    String id,
    Club club,
    Admin admin,
    Role role,
    RoleStatus status,
    LocalDateTime createdAt,
    LocalDateTime updatedAt) {

  public static ClubRole initialize(Club club, Admin admin, Role role, RoleStatus status) {
    return ClubRole.builder()
        .id(DEFAULT_INITIAL_ID)
        .club(club)
        .admin(admin)
        .role(role)
        .status(status)
        .build();
  }
}
