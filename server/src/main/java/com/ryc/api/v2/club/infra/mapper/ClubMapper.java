package com.ryc.api.v2.club.infra.mapper;

import java.util.List;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
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
        .deleted(club.getDeleted())
        .build();
  }

  public static Club toDomainWithClubTagsAndClubSummaries(
      ClubEntity clubEntity, List<ClubTag> clubTags, List<ClubSummary> clubSummaries) {
    return Club.builder()
        .id(clubEntity.getId())
        .name(clubEntity.getName())
        .shortDescription(clubEntity.getShortDescription())
        .detailDescription(clubEntity.getDetailDescription())
        .imageUrl(clubEntity.getImageUrl())
        .thumbnailUrl(clubEntity.getThumbnailUrl())
        .category(clubEntity.getCategory())
        .clubTags(clubTags)
        .clubSummaries(clubSummaries)
        .deleted(clubEntity.getDeleted())
        .createdAt(clubEntity.getCreatedAt())
        .updatedAt(clubEntity.getUpdatedAt())
        .build();
  }
}
