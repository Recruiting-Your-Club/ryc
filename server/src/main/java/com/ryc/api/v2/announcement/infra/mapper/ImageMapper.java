package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.AnnouncementImage;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementImageEntity;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

public class ImageMapper {

  public static AnnouncementImage toDomain(AnnouncementImageEntity entity) {
    return AnnouncementImage.builder()
        .id(entity.getId())
        .fileMetadataId(entity.getFileMetadataId())
        .build();
  }

  public static AnnouncementImageEntity toEntity(
      AnnouncementImage domain, FileMetadataEntity fileMetadata, int displayOrder) {
    return AnnouncementImageEntity.builder()
        .id(domain.getId())
        .fileMetadata(fileMetadata)
        .displayOrder(displayOrder)
        .build();
  }
}
