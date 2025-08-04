package com.ryc.api.v2.s3.infra.mapper;

import com.ryc.api.v2.s3.domain.FileMetaData;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

public class FileMetaDataMapper {
    public static FileMetadataEntity toEntity(FileMetaData fileMetaData) {
        return FileMetadataEntity.builder()
                .id(fileMetaData.getId())
                .filePath(fileMetaData.getFilePath())
                .originalFileName(fileMetaData.getOriginalFileName())
                .contentType(fileMetaData.getContentType())
                .fileSize(fileMetaData.getFileSize())
                .fileType(fileMetaData.getFileType())
                .associatedId(fileMetaData.getAssociatedId())
                .uploadedByUserId(fileMetaData.getUploadedByUserId())
                .status(fileMetaData.getStatus())
                .build();
    }

    public static FileMetaData toDomain(FileMetadataEntity fileMetadataEntity) {
        return FileMetaData.builder()
                .id(fileMetadataEntity.getId())
                .filePath(fileMetadataEntity.getFilePath())
                .originalFileName(fileMetadataEntity.getOriginalFileName())
                .contentType(fileMetadataEntity.getContentType())
                .fileSize(fileMetadataEntity.getFileSize())
                .fileType(fileMetadataEntity.getFileType())
                .associatedId(fileMetadataEntity.getAssociatedId())
                .uploadedByUserId(fileMetadataEntity.getUploadedByUserId())
                .status(fileMetadataEntity.getStatus())
                .build();
    }
}
