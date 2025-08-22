package com.ryc.api.v2.common.infra.mapper;

import com.ryc.api.v2.common.domain.Tag;
import com.ryc.api.v2.common.infra.vo.TagVO;

public class TagMapper {
  public static Tag toDomain(TagVO tagVO) {
    return Tag.builder().label(tagVO.getLabel()).build();
  }

  public static TagVO toVO(Tag tag) {
    return TagVO.builder().label(tag.label()).build();
  }
}
