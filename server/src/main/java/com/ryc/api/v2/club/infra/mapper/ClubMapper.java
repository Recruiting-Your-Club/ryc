package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.infra.entity.ClubEntity;

public class ClubMapper {
  private ClubMapper() {
    // Prevent instantiation
  }

  public static ClubEntity toEntity(Club club) {
    return ClubEntity.builder()
        .id(club.getId())
        .name(club.getName())
        .shortDescription(club.getShortDescription())
        .detailDescription(club.getDetailDescription())
        .imageUrl(club.getImageUrl())
        .thumbnailUrl(club.getThumbnailUrl())
        .category(club.getCategory())
        .clubTags(club.getClubTags())
        .clubSummaries(club.getClubSummaries())
        .clubDetailImages(club.getClubDetailImages())
        .deleted(club.getDeleted())
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
        .deleted(clubEntity.getDeleted())
        .createdAt(clubEntity.getCreatedAt())
        .updatedAt(clubEntity.getUpdatedAt())
        .build();
  }
}
