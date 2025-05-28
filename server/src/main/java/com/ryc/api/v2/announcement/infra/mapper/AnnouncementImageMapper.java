package com.ryc.api.v2.announcement.infra.mapper;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementImageMapper {

  /** Domain to ImageVO */
  public ImageVO toVO(Image image) {

    return ImageVO.builder().imageUrl(image.imageUrl()).thumbnailUrl(image.thumbnailUrl()).build();
  }

  /** ImageVO to Domain */
  public Image toDomain(ImageVO imageVO) {

    return Image.builder()
        .imageUrl(imageVO.getImageUrl())
        .thumbnailUrl(imageVO.getThumbnailUrl())
        .build();
  }
}
