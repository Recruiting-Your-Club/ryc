package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public class ClubTagMapper {
  public static ClubTagEntity toEntity(ClubTag clubTag, ClubEntity clubEntity) {
    return ClubTagEntity.builder()
        .id(clubTag.getId())
        .name(clubTag.getName())
        .clubEntity(clubEntity)
        .build();
  }

  // TODO: club 정보를 도메인에도 설정하는 것이 맞을까? 현재는 Tag 자체 로직이 없기에 필요하지 않아 추가하지 않았다.
  public static ClubTag toDomain(ClubTagEntity clubTagEntity) {
    return ClubTag.builder().id(clubTagEntity.getId()).name(clubTagEntity.getName()).build();
  }
}
