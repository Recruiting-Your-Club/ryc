package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.vo.TagVO;

public class AnnouncementTagMapper {
  public static Tag toDomain(TagVO tagVO) {
    return Tag.builder().label(tagVO.getLabel()).build();
  }

  public static TagVO toVO(Tag tag) {
    return TagVO.builder().label(tag.label()).build();
  }
}
