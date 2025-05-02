package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public class ClubTagMapper {
  private ClubTagMapper() {
    // Prevent instantiation
  }

  public static ClubTagEntity toEntity(ClubTag clubTag, ClubEntity clubEntity) {
    return ClubTagEntity.builder()
        .id(clubTag.getId())
        .name(clubTag.getName())
        .clubEntity(clubEntity)
        .build();
  }

  public static ClubTag toDomain(ClubTagEntity clubTagEntity) {
    return ClubTag.builder().id(clubTagEntity.getId()).name(clubTagEntity.getName()).build();
  }
}
