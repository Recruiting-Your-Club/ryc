package com.ryc.api.v2.club.domain;

import com.ryc.api.v2.club.presentation.dto.request.ClubTagRequest;

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

  public static ClubTag initialize(ClubTagRequest request) {
    return ClubTag.builder().id(request.id()).name(request.name()).build();
  }
}
