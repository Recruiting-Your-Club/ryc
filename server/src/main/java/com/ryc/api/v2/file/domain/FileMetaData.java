package com.ryc.api.v2.file.domain;

import java.time.LocalDateTime;
import java.util.UUID;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.file.presentation.dto.request.UploadUrlRequest;
import com.ryc.api.v2.util.DataResolveUtil;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FileMetaData {
  private final String id;
  private final String filePath;
  private final String originalFileName;
  private final String contentType;
  private final Long fileSize;
  private final boolean isDeleted;
  private final int displayOrder;
  private final String accessToken;
  private final LocalDateTime createdAt;

  private final FileDomainType fileDomainType;

  private final String associatedId;

  private final String uploadedByUserId;

  private final FileStatus status;

  @Builder
  private FileMetaData(
      String id,
      String filePath,
      String originalFileName,
      String contentType,
      Long fileSize,
      boolean isDeleted,
      int displayOrder,
      String accessToken,
      LocalDateTime createdAt,
      FileDomainType fileDomainType,
      String associatedId,
      String uploadedByUserId,
      FileStatus status) {

    // 1. 정제
    String sanitizedFilePath = DataResolveUtil.sanitizeString(filePath);
    String sanitizedOriginalFileName = DataResolveUtil.sanitizeString(originalFileName);
    String sanitizedContentType = DataResolveUtil.sanitizeString(contentType);

    // 2. 선택 멤버 변수 기본값 처리
    Long resolvedFileSize = fileSize != null ? fileSize : 0L;
    boolean resolvedIsDeleted =
        isDeleted; // 미사용 필드, 미입력시는 자동으로 false 저장 TODO: boolean null 비허용이라, 추후 Boolean, boolean 사용기준
    // 확립
    int resolvedDisplayOrder =
        displayOrder; // 미입력시 자동으로 0 저장 TODO: 따라서 Integer 변환 후, 미입력시 우선순위 최 하위값 지정 필요

    // 3. 검증
    FileMetaDataValidator.validate(
        id,
        sanitizedFilePath,
        sanitizedOriginalFileName,
        sanitizedContentType,
        resolvedFileSize,
        resolvedIsDeleted,
        resolvedDisplayOrder,
        accessToken,
        createdAt,
        fileDomainType,
        associatedId,
        uploadedByUserId,
        status);

    // 4. 할당
    this.id = id;
    this.filePath = sanitizedFilePath;
    this.originalFileName = sanitizedOriginalFileName;
    this.contentType = sanitizedContentType;
    this.fileSize = resolvedFileSize;
    this.isDeleted = resolvedIsDeleted;
    this.displayOrder = resolvedDisplayOrder;
    this.accessToken = accessToken;
    this.createdAt = createdAt;
    this.fileDomainType = fileDomainType;
    this.associatedId = associatedId;
    this.uploadedByUserId = uploadedByUserId;
    this.status = status;
  }

  /**
   * create시 사용되는 정적 팩토리 메서드
   *
   * @param request 업로드 요청 request dto
   * @param path s3 Key(prefix)
   * @return FileMetaData domain 객체
   */
  public static FileMetaData initialize(UploadUrlRequest request, String path) {
    FileDomainType domainType = FileDomainType.from(request.fileType());

    String accessToken = null;
    if (domainType.getIsPrivate()) {
      accessToken = UUID.randomUUID().toString();
    }

    return FileMetaData.builder()
        .id(DomainDefaultValues.DEFAULT_INITIAL_ID)
        .filePath(path)
        .originalFileName(request.fileName())
        .contentType(request.contentType())
        .fileDomainType(FileDomainType.from(request.fileType()))
        .accessToken(accessToken)
        .associatedId(null)
        .uploadedByUserId(null)
        .status(FileStatus.PENDING)
        .isDeleted(false)
        .fileSize(0L)
        .displayOrder(0)
        .build();
  }

  public boolean isCorrectAccessToken(String accessToken) {
    if (fileDomainType.getIsPrivate()) {
      return this.accessToken.equals(accessToken);
    }
    return accessToken == null;
  }

  public FileMetaData confirmUpload(Long fileSize) {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .accessToken(accessToken)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(FileStatus.UPLOAD_COMPLETED)
        .isDeleted(false)
        .createdAt(this.createdAt)
        .displayOrder(displayOrder)
        .build();
  }

  public FileMetaData delete() {
    return FileMetaData.builder()
        .id(id)
        .filePath(filePath)
        .originalFileName(originalFileName)
        .contentType(contentType)
        .accessToken(accessToken)
        .fileSize(fileSize)
        .fileDomainType(fileDomainType)
        .associatedId(associatedId)
        .uploadedByUserId(uploadedByUserId)
        .status(status)
        .isDeleted(true)
        .createdAt(this.createdAt)
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
        .createdAt(this.createdAt)
        .accessToken(accessToken)
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
        .createdAt(this.createdAt)
        .accessToken(accessToken)
        .isDeleted(false)
        .uploadedByUserId(uploadedByUserId)
        .status(status)
        .isDeleted(isDeleted)
        .displayOrder(displayOrder)
        .build();
  }
}
