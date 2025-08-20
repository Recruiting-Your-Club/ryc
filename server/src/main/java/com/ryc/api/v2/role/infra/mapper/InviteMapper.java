package com.ryc.api.v2.role.infra.mapper;

import com.ryc.api.v2.role.domain.Invite;
import com.ryc.api.v2.role.infra.entity.InviteEntity;

public class InviteMapper {

  private InviteMapper() {
    // Private constructor to prevent instantiation
  }

  public static Invite toDomain(InviteEntity inviteEntity) {
    return Invite.builder()
        .id(inviteEntity.getId())
        .clubId(inviteEntity.getClubId())
        .expiresAt(inviteEntity.getExpiresAt())
        .build();
  }

  public static InviteEntity toEntity(Invite invite) {
    return InviteEntity.builder()
        .id(invite.getId())
        .clubId(invite.getClubId())
        .expiresAt(invite.getExpiresAt())
        .build();
  }
}
