package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.vo.ClubDetailImage;
import com.ryc.api.v2.club.infra.entity.ClubDetailImageEntity;

public class ClubDetailImageMapper {

  private ClubDetailImageMapper() {
    // Private constructor to prevent instantiation
  }

  public static ClubDetailImage toDomain(ClubDetailImageEntity entity) {
    return ClubDetailImage.builder()
        .id(entity.getId())
        .imageUrl(entity.getImageUrl())
        .thumbnailUrl(entity.getThumbnailUrl())
        .build();
  }

  public static ClubDetailImageEntity toEntity(ClubDetailImage clubDetailImage) {
    return ClubDetailImageEntity.builder()
        .id(clubDetailImage.getId())
        .imageUrl(clubDetailImage.getImageUrl())
        .thumbnailUrl(clubDetailImage.getThumbnailUrl())
        .build();
  }
}
