package com.ryc.api.v2.club.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Embeddable
@Getter
@Builder
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED, force = true)
public class ClubDetailImage {

  @Column(columnDefinition = "varchar(500)")
  private final String imageUrl;

  @Column(columnDefinition = "varchar(500)")
  private final String thumbnailUrl;
}
