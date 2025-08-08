package com.ryc.api.v2.club.infra.mapper;

import java.util.List;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubDetailImage;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubDetailImageEntity;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;
import com.ryc.api.v2.club.infra.entity.ClubTagEntity;

public class ClubMapper {

  private ClubMapper() {
    // Prevent instantiation
  }

  public static ClubEntity toEntity(Club club) {
    ClubEntity clubEntity =
        ClubEntity.builder()
            .id(club.getId())
            .name(club.getName())
            .shortDescription(club.getShortDescription())
            .detailDescription(club.getDetailDescription())
            .imageUrl(club.getImageUrl())
            .thumbnailUrl(club.getThumbnailUrl())
            .category(club.getCategory())
            .build();

    for (ClubTag clubTag : club.getClubTags()) {
      ClubTagEntity clubTagEntity = ClubTagMapper.toEntity(clubTag, clubEntity);
      clubEntity.addClubTag(clubTagEntity);
    }

    for (ClubSummary clubSummary : club.getClubSummaries()) {
      ClubSummaryEntity clubSummaryEntity = ClubSummaryMapper.toEntity(clubSummary, clubEntity);
      clubEntity.addClubSummary(clubSummaryEntity);
    }

    for (ClubDetailImage clubDetailImage : club.getClubDetailImages()) {
      ClubDetailImageEntity clubDetailImageEntity =
          ClubDetailImageMapper.toEntity(clubDetailImage, clubEntity);
      clubEntity.addClubDetailImage(clubDetailImageEntity);
    }
    return clubEntity;
  }

  public static Club toDomain(ClubEntity clubEntity) {
    List<ClubTag> clubTags =
        clubEntity.getClubTags().stream().map(ClubTagMapper::toDomain).toList();
    List<ClubSummary> clubSummaries =
        clubEntity.getClubSummaries().stream().map(ClubSummaryMapper::toDomain).toList();
    List<ClubDetailImage> clubDetailImages =
        clubEntity.getClubDetailImages().stream().map(ClubDetailImageMapper::toDomain).toList();

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
        .clubDetailImages(clubDetailImages)
        .build();
  }
}
