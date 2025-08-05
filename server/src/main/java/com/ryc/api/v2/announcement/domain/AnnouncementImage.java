package com.ryc.api.v2.announcement.domain;

import com.ryc.api.v2.announcement.presentation.dto.request.ImageCreateRequest;
import com.ryc.api.v2.announcement.presentation.dto.request.ImageUpdateRequest;
import com.ryc.api.v2.common.constant.DomainDefaultValues;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnnouncementImage {
  private final String id;
  private final String fileMetadataId;

  public static AnnouncementImage initialize(ImageCreateRequest request) {
    return AnnouncementImage.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .fileMetadataId(request.fileMetadataId())
        .build();
  }

  public static AnnouncementImage from(ImageUpdateRequest request) {
    return AnnouncementImage.builder()
        .id(request.id())
        .fileMetadataId(request.fileMetadataId())
        .build();
  }
}
