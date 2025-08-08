package com.ryc.api.v2.club.infra.mapper;

import com.ryc.api.v2.club.domain.vo.ClubSummary;
import com.ryc.api.v2.club.infra.entity.ClubSummaryEntity;

public class ClubSummaryMapper {

  private ClubSummaryMapper() {
    // Prevent instantiation
  }

  public static ClubSummary toDomain(ClubSummaryEntity clubSummaryEntity) {
    return ClubSummary.builder()
        .id(clubSummaryEntity.getId())
        .title(clubSummaryEntity.getTitle())
        .value(clubSummaryEntity.getValue())
        .build();
  }

  public static ClubSummaryEntity toEntity(ClubSummary clubSummary) {
    return ClubSummaryEntity.builder()
        .id(clubSummary.getId())
        .title(clubSummary.getTitle())
        .value(clubSummary.getValue())
        .build();
  }
}
