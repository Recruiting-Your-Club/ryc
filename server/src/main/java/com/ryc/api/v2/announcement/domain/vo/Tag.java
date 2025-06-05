package com.ryc.api.v2.announcement.domain.vo;

import lombok.Builder;

/**
 * tag pojo객체
 *
 * @param label 태그 이름
 */
@Builder
public record Tag(String label) {
  public static Tag initialize(String label) {
    return Tag.builder().label(label).build();
  }
}
