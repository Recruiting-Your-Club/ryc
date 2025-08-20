package com.ryc.api.v2.role.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import com.ryc.api.v2.admin.domain.Admin;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.role.domain.enums.Role;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ClubRole {
  private final String id;
  private final Role role;
  private final Club club;
  private final Admin admin;
  private final LocalDateTime joinedAt;

  public static ClubRole initialize(Club club, Admin admin, Role role) {
    return ClubRole.builder().id(DEFAULT_INITIAL_ID).club(club).admin(admin).role(role).build();
  }
}
