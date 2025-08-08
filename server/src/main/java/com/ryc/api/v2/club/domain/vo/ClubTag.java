package com.ryc.api.v2.club.domain.vo;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubTag {

  private final String id;
  private final String name;

  public static ClubTag initialize(String name) {
    return ClubTag.builder().id(DEFAULT_INITIAL_ID).name(name).build();
  }
}
