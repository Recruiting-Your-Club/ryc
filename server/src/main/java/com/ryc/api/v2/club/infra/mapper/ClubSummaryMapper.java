package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;

public class ClubSummaryMapper {

  private ClubSummaryMapper() {
    // Prevent instantiation
  }

  public static ClubSummaryEntity toEntity(ClubSummary clubSummary, ClubEntity clubEntity) {
    return ClubSummaryEntity.builder()
        .id(clubSummary.getId())
        .summaryKey(clubSummary.getKey())
        .value(clubSummary.getValue())
        .clubEntity(clubEntity)
        .build();
  }

  public static ClubSummary toDomain(ClubSummaryEntity clubSummaryEntity) {
    return ClubSummary.builder()
        .id(clubSummaryEntity.getId())
        .key(clubSummaryEntity.getSummaryKey())
        .value(clubSummaryEntity.getValue())
        .build();
  }
}
