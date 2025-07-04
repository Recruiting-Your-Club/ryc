package com.ryc.api.v2.announcement.infra.mapper;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.vo.TagVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementTagMapper {

  /** VO to Domain */
  public Tag toDomain(TagVO tagVO) {

    return Tag.builder().label(tagVO.getLabel()).build();
  }

  /** Domain to VO */
  public TagVO toVO(Tag tag) {

    return TagVO.builder().label(tag.label()).build();
  }
}
