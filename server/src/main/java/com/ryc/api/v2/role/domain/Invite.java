package com.ryc.api.v2.role.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Invite {

  private final String id;
  private final String clubId;
  private final LocalDateTime expiresAt;

  @Builder
  public Invite(String id, String clubId, LocalDateTime expiresAt) {
    this.id = id;
    this.clubId = clubId;
    this.expiresAt = expiresAt;
  }

  public static Invite initialize(String clubId) {
    LocalDateTime newExpiresAt = LocalDateTime.now().plusDays(2);
    return Invite.builder().id(DEFAULT_INITIAL_ID).clubId(clubId).expiresAt(newExpiresAt).build();
  }

  public boolean isExpired() {
    return expiresAt.isBefore(LocalDateTime.now());
  }
}
