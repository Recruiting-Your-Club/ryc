package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.vo.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public class ClubTagMapper {

  private ClubTagMapper() {
    // Prevent instantiation
  }

  public static ClubTag toDomain(ClubTagEntity clubTagEntity) {
    return ClubTag.builder().id(clubTagEntity.getId()).name(clubTagEntity.getName()).build();
  }

  public static ClubTagEntity toEntity(ClubTag clubTag) {
    return ClubTagEntity.builder().id(clubTag.getId()).name(clubTag.getName()).build();
  }
}
