package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AnnouncementImageMapper {

    public ImageVO toVO (Image image) {

        return ImageVO.builder()
                .image_url(image.getImage_url())
                .order(image.getOrder())
                .thumbnail_url(image.getThumbnail_url())
                .build();
    }

    public Image toDomain (ImageVO imageVO) {

        return Image.builder()
                .image_url(imageVO.getImage_url())
                .order(imageVO.getOrder())
                .thumbnail_url(imageVO.getThumbnail_url())
                .build();
    }
}
