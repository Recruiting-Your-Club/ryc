package com.ryc.api.v2.announcement.infra.vo;

import jakarta.persistence.Embeddable;

import lombok.*;

@Embeddable
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ImageVO {
  private String thumbnailUrl;
  private String imageUrl;
}
