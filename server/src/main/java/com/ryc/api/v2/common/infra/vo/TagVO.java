package com.ryc.api.v2.common.infra.vo;

import jakarta.persistence.Embeddable;

import lombok.*;

@Embeddable
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TagVO {
  private String label;
  private int displayOrder;
}
