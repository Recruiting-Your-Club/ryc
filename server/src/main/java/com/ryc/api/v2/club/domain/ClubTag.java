package com.ryc.api.v2.club.domain;

import com.ryc.api.v2.club.presentation.dto.request.ClubTagRequest;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ClubTag {

  private final String id;
  private final String name;

  @Builder
  private ClubTag(String id, String name) {

    // 1. 정제
    String sanitizedName = DataResolveUtil.sanitizeString(name);

    // 2. 검증
    ClubTagValidator.validate(id, sanitizedName);

    // 3. 할당
    this.id = id;
    this.name = sanitizedName;
  }

  public static ClubTag initialize(ClubTagRequest request) {
    return ClubTag.builder().id(request.id()).name(request.name()).build();
  }
}
