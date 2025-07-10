package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.vo.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;

public class ClubMapper {
  private ClubMapper() {
    // Prevent instantiation
  }

  public static ClubEntity toEntity(Club club) {
    return ClubEntity.builder()
        .id(club.id())
        .name(club.name())
        .shortDescription(club.shortDescription())
        .detailDescription(club.detailDescription())
        .imageUrl(club.imageUrl())
        .thumbnailUrl(club.thumbnailUrl())
        .category(club.category())
        .clubTags(club.clubTags())
        .clubSummaries(club.clubSummaries())
        .clubDetailImages(club.clubDetailImages())
        .deleted(club.deleted())
        .build();
  }

  public static Club toDomain(ClubEntity clubEntity) {
    return Club.builder()
        .id(clubEntity.getId())
        .name(clubEntity.getName())
        .shortDescription(clubEntity.getShortDescription())
        .detailDescription(clubEntity.getDetailDescription())
        .imageUrl(clubEntity.getImageUrl())
        .thumbnailUrl(clubEntity.getThumbnailUrl())
        .category(clubEntity.getCategory())
        .clubTags(clubEntity.getClubTags())
        .clubSummaries(clubEntity.getClubSummaries())
        .clubDetailImages(clubEntity.getClubDetailImages())
        .createdAt(clubEntity.getCreatedAt())
        .updatedAt(clubEntity.getUpdatedAt())
        .deleted(clubEntity.getDeleted())
        .build();
  }
}
