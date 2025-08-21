package com.ryc.api.v2.role.infra.mapper;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.role.domain.ClubInvite;
import com.ryc.api.v2.role.infra.entity.ClubInviteEntity;

public class ClubInviteMapper {

  private ClubInviteMapper() {
    // Private constructor to prevent instantiation
  }

  public static ClubInvite toDomain(ClubInviteEntity clubInviteEntity) {
    Club club = ClubMapper.toDomain(clubInviteEntity.getClub());

    return ClubInvite.builder()
        .id(clubInviteEntity.getId())
        .club(club)
        .expiresAt(clubInviteEntity.getExpiresAt())
        .build();
  }

  public static ClubInviteEntity toEntity(ClubInvite clubInvite) {
    ClubEntity club = ClubMapper.toEntity(clubInvite.getClub());

    return ClubInviteEntity.builder()
        .id(clubInvite.getId())
        .club(club)
        .expiresAt(clubInvite.getExpiresAt())
        .build();
  }
}
