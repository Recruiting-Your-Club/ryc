package com.ryc.api.v2.club.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubSummary {
  private final String id;
  private final String key;
  private final String value;

  public static ClubSummary initialize(String key, String value) {
    return ClubSummary.builder().id(DEFAULT_INITIAL_ID).key(key).value(value).build();
  }
}
