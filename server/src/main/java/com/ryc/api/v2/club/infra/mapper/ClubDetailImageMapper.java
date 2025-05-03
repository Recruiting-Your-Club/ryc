package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.ClubDetailImage;
import com.ryc.api.v2.club.infra.entity.ClubDetailImageEntity;
import com.ryc.api.v2.club.infra.entity.ClubEntity;

public class ClubDetailImageMapper {

  private ClubDetailImageMapper() {
    // Prevent instantiation
  }

  public static ClubDetailImageEntity toEntityWithClubEntity(
      ClubDetailImage clubDetailImage, ClubEntity clubEntity) {
    return ClubDetailImageEntity.builder()
        .id(clubDetailImage.getId())
        .imageUrl(clubDetailImage.getImageUrl())
        .thumbnailUrl(clubDetailImage.getThumbnailUrl())
        .clubEntity(clubEntity)
        .build();
  }

  public static ClubDetailImage toDomain(ClubDetailImageEntity clubDetailImageEntity) {
    return ClubDetailImage.builder()
        .id(clubDetailImageEntity.getId())
        .imageUrl(clubDetailImageEntity.getImageUrl())
        .thumbnailUrl(clubDetailImageEntity.getThumbnailUrl())
        .build();
  }
}
