package com.ryc.api.v2.role.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import com.ryc.api.v2.club.domain.Club;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ClubInvite {

  private final String id;
  private final Club club;
  private final LocalDateTime expiresAt;

  @Builder
  public ClubInvite(String id, Club club, LocalDateTime expiresAt) {
    this.id = id;
    this.club = club;
    this.expiresAt = expiresAt;
  }

  public static ClubInvite initialize(Club club) {
    LocalDateTime newExpiresAt = LocalDateTime.now().plusDays(2);
    return ClubInvite.builder().id(DEFAULT_INITIAL_ID).club(club).expiresAt(newExpiresAt).build();
  }

  public boolean isExpired() {
    return expiresAt.isBefore(LocalDateTime.now());
  }
}
