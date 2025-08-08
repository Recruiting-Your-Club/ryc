package com.ryc.api.v2.club.domain;

import com.ryc.api.v2.club.presentation.dto.request.ClubSummaryRequest;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubSummary {

  private final String id;
  private final String title;
  private final String value;

  public static ClubSummary initialize(ClubSummaryRequest request) {
    return ClubSummary.builder()
        .id(request.id())
        .title(request.title())
        .value(request.value())
        .build();
  }
}
