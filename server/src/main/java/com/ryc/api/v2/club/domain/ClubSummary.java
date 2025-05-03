package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubSummary {
  private final String id;
  private final String title;
  private final String value;

  public static ClubSummary initialize(String title, String value) {
    return ClubSummary.builder().id(DEFAULT_INITIAL_ID).title(title).value(value).build();
  }
}
