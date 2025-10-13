package com.ryc.api.v2.file.infra.mapper;

import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.infra.entity.FileMetadataEntity;

public class FileMetaDataMapper {
  public static FileMetadataEntity toEntity(FileMetaData fileMetaData) {
    return FileMetadataEntity.builder()
        .id(fileMetaData.getId())
        .filePath(fileMetaData.getFilePath())
        .originalFileName(fileMetaData.getOriginalFileName())
        .contentType(fileMetaData.getContentType())
        .fileSize(fileMetaData.getFileSize())
        .fileDomainType(fileMetaData.getFileDomainType())
        .associatedId(fileMetaData.getAssociatedId())
        .uploadedByUserId(fileMetaData.getUploadedByUserId())
        .isDeleted(fileMetaData.isDeleted())
        .status(fileMetaData.getStatus())
        .displayOrder(fileMetaData.getDisplayOrder())
        .accessToken(fileMetaData.getAccessToken())
        .build();
  }

  public static FileMetaData toDomain(FileMetadataEntity fileMetadataEntity) {
    return FileMetaData.builder()
        .id(fileMetadataEntity.getId())
        .filePath(fileMetadataEntity.getFilePath())
        .originalFileName(fileMetadataEntity.getOriginalFileName())
        .contentType(fileMetadataEntity.getContentType())
        .fileSize(fileMetadataEntity.getFileSize())
        .fileDomainType(fileMetadataEntity.getFileDomainType())
        .associatedId(fileMetadataEntity.getAssociatedId())
        .uploadedByUserId(fileMetadataEntity.getUploadedByUserId())
        .status(fileMetadataEntity.getStatus())
        .isDeleted(fileMetadataEntity.isDeleted())
        .accessToken(fileMetadataEntity.getAccessToken())
        .displayOrder(fileMetadataEntity.getDisplayOrder())
        .createdAt(fileMetadataEntity.getCreatedAt())
        .build();
  }
}
