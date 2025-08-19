package com.ryc.api.v2.announcement.domain.vo;

import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;

/**
 * tag pojo객체
 *
 * @param label 태그 이름
 */
public record Tag(String label) {

  @Builder
  public Tag {
    String sanitizeLabel = DataResolveUtil.sanitizeString(label);

    TagValidator.validate(sanitizeLabel);

    label = sanitizeLabel;
  }

  public static Tag from(String label) {
    return Tag.builder().label(label).build();
  }
}
