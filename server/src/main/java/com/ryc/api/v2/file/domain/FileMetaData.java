package com.ryc.api.v2.file.domain;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.file.presentation.dto.request.UploadUrlRequest;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class FileMetaData {
  private final String id;
  private final String filePath;
  private final String originalFileName;
  private final String contentType;
  private final Long fileSize;
  private final boolean isDeleted;
  private final int displayOrder;

  private final FileDomainType fileDomainType;

  private final String associatedId;

  private final String uploadedByUserId;

  private final FileStatus status;

  /**
   * create시 사용되는 정적 팩토리 메서드
   *
   * @param request 업로드 요청 request dto
   * @param path s3 Key(prefix)
   * @return FileMetaData domain 객체
   */
  public static FileMetaData initialize(UploadUrlRequest request, String path) {
    return FileMetaData.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .filePath(path)
        .originalFileName(request.fileName())
        .contentType(request.contentType())
        .fileDomainType(FileDomainType.from(request.fileType()))
        .associatedId(null)
        .uploadedByUserId(null)
        .status(FileStatus.PENDING)
        .isDeleted(false)
        .fileSize(0L)
        .displayOrder(0)
        .build();
  }

  public FileMetaData confirmUpload(Long fileSize) {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(FileStatus.COMPLETED)
        .isDeleted(false)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData issueFailUpload() {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(FileStatus.FAILED)
        .isDeleted(true)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData delete() {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(status)
        .isDeleted(true)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData claimOwnership(String associatedId, int displayOrder) {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(FileStatus.MOVE_REQUESTED)
        .isDeleted(isDeleted)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData issueFileMoveSuccess(String filePath) {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(FileStatus.ATTACHED)
        .isDeleted(isDeleted)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData updateDisplayOrder(int displayOrder) {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(status)
        .isDeleted(isDeleted)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData issueFileMoveFail() {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(FileStatus.MOVE_FAILED)
        .isDeleted(isDeleted)
        .displayOrder(displayOrder)
        .build();
  }
}
