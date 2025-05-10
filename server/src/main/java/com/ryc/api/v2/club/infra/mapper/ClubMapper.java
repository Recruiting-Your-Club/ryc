package com.ryc.api.v2.club.infra.mapper;

import java.util.List;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public class ClubMapper {
  public static ClubEntity toEntity(Club club) {
    return ClubEntity.builder()
        .id(club.getId())
        .name(club.getName())
        .description(club.getDescription())
        .imageUrl(club.getImageUrl())
        .thumbnailUrl(club.getThumbnailUrl())
        .category(club.getCategory())
        .deleted(club.getDeleted())
        .build();
  }

  public static Club toDomain(ClubEntity clubEntity, List<ClubTagEntity> clubTagEntities) {
    final List<ClubTag> clubTags = clubTagEntities.stream().map(ClubTagMapper::toDomain).toList();

    return Club.builder()
        .id(clubEntity.getId())
        .name(clubEntity.getName())
        .description(clubEntity.getDescription())
        .imageUrl(clubEntity.getImageUrl())
        .thumbnailUrl(clubEntity.getThumbnailUrl())
        .category(clubEntity.getCategory())
        .clubTags(clubTags)
        .deleted(clubEntity.getDeleted())
        .createdAt(clubEntity.getCreatedAt())
        .updatedAt(clubEntity.getUpdatedAt())
        .build();
  }
}
