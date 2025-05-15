package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AnnouncementTagMapper {

    public Tag toDomain(TagVO tagVO) {

        return Tag.builder()
                .label(tagVO.getLabel())
                .order(tagVO.getOrder())
                .build();
    }

    public TagVO toVO(Tag tag) {

        return TagVO.builder()
                .label(tag.getLabel())
                .order(tag.getOrder())
                .build();
    }
}
