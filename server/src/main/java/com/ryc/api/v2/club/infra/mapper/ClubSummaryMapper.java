package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;

public class ClubSummaryMapper {

  private ClubSummaryMapper() {
    // Prevent instantiation
  }

  public static ClubSummary toDomain(ClubSummaryEntity clubSummaryEntity) {
    return ClubSummary.builder()
        .id(clubSummaryEntity.getId())
        .title(clubSummaryEntity.getTitle())
        .content(clubSummaryEntity.getContent())
        .build();
  }

  public static ClubSummaryEntity toEntity(ClubSummary clubSummary, ClubEntity clubEntity) {
    return ClubSummaryEntity.builder()
        .id(clubSummary.getId())
        .title(clubSummary.getTitle())
        .content(clubSummary.getContent())
        .club(clubEntity)
        .build();
  }
}
