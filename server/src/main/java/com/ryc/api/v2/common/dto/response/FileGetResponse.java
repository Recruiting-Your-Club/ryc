package com.ryc.api.v2.common.dto.response;

import com.ryc.api.v2.file.domain.FileMetaData;

import lombok.Builder;

@Builder
public record FileGetResponse(String id, String url, String originalFileName, String contentType) {
  public static FileGetResponse of(FileMetaData fileMetadata, String url) {
    return FileGetResponse.builder()
        .id(fileMetadata.getId())
        .url(url)
        .originalFileName(fileMetadata.getOriginalFileName())
        .contentType(fileMetadata.getContentType())
        .build();
  }
}
