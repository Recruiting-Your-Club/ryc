package com.ryc.api.v2.file.domain;

import static com.ryc.api.v2.common.exception.code.InvalidFormatErrorCode.*;

import java.util.regex.Pattern;

import com.ryc.api.v2.common.validator.DomainValidator;

final class FileMetaDataValidator extends DomainValidator {

  private FileMetaDataValidator() {}

  private static final Pattern UUID_PATTERN =
      Pattern.compile(
          "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");

  private static final int MIN_FILE_PATH_LENGTH = 1;
  private static final int MAX_FILE_PATH_LENGTH = 2048;
  private static final int MIN_ORIGINAL_FILE_NAME_LENGTH = 1;
  private static final int MAX_ORIGINAL_FILE_NAME_LENGTH = 255;
  private static final int MIN_CONTENT_TYPE_LENGTH = 1;
  private static final int MAX_CONTENT_TYPE_LENGTH = 255;
  private static final long MIN_FILE_SIZE = 0L;
  private static final long MAX_FILE_SIZE = 104857600L; // 100MB
  private static final int MIN_DISPLAY_ORDER = 0;
  private static final int MAX_DISPLAY_ORDER = 999;

  static void validate(
      String id,
      String filePath,
      String originalFileName,
      String contentType,
      Long fileSize,
      boolean isDeleted,
      int displayOrder,
      FileDomainType fileDomainType,
      String associatedId,
      String uploadedByUserId,
      FileStatus status) {

    validateId(id);
    validateFilePath(filePath);
    validateOriginalFileName(originalFileName);
    validateContentType(contentType);
    validateFileSize(fileSize);
    validateisDeleted(isDeleted); //
    validateDisplayOrder(displayOrder); //
    validateFileDomainType(fileDomainType); //
    validateAssociatedId(associatedId);
    validateUploadedByUserId(uploadedByUserId);
    validateStatus(status); //
  }

  private static void validateId(String id) {
    validateNotNullOrEmpty(id, FILE_METADATA_ID_NULL_OR_EMPTY);
    validatePattern(id, UUID_PATTERN, FILE_METADATA_INVALID_ID_FORMAT);
  }

  private static void validateFilePath(String filePath) {
    // TODO: 파일 경로 포멧 검증 추가
    validateNotNullOrEmpty(filePath, FILE_METADATA_FILE_PATH_NULL_OR_EMPTY);
    validateLengthRange(
        filePath,
        MIN_FILE_PATH_LENGTH,
        MAX_FILE_PATH_LENGTH,
        FILE_METADATA_INVALID_FILE_PATH_LENGTH);
  }

  private static void validateOriginalFileName(String originalFileName) {
    validateNotNullOrEmpty(originalFileName, FILE_METADATA_ORIGINAL_FILE_NAME_NULL_OR_EMPTY);
    validateLengthRange(
        originalFileName,
        MIN_ORIGINAL_FILE_NAME_LENGTH,
        MAX_ORIGINAL_FILE_NAME_LENGTH,
        FILE_METADATA_INVALID_ORIGINAL_FILE_NAME_LENGTH);
  }

  private static void validateContentType(String contentType) {
    validateNotNullOrEmpty(contentType, FILE_METADATA_CONTENT_TYPE_NULL_OR_EMPTY);
    validateLengthRange(
        contentType,
        MIN_CONTENT_TYPE_LENGTH,
        MAX_CONTENT_TYPE_LENGTH,
        FILE_METADATA_INVALID_CONTENT_TYPE_LENGTH);
  }

  private static void validateFileSize(Long fileSize) {
    // NULL 허용
    if (fileSize == null) return;
    validateLongRange(
        fileSize, MIN_FILE_SIZE, MAX_FILE_SIZE, FILE_METADATA_INVALID_FILE_SIZE_RANGE);
  }

  private static void validateisDeleted(boolean isDeleted) {
    // TODO: 추후 Boolean으로 변경시 구현 필요
  }

  private static void validateDisplayOrder(int displayOrder) {
    validateIntRange(
        displayOrder,
        MIN_DISPLAY_ORDER,
        MAX_DISPLAY_ORDER,
        FILE_METADATA_INVALID_DISPLAY_ORDER_RANGE);
  }

  private static void validateFileDomainType(FileDomainType fileDomainType) {
    validateNotNull(fileDomainType, FILE_METADATA_FILE_DOMAIN_TYPE_NULL);
  }

  private static void validateAssociatedId(String associatedId) {
    // Null 허용 (Id 값은 정제하지 않았기에 Empty 값 검증도 필요) TODO: empty일때 null 취급
    if (associatedId != null && !associatedId.isEmpty()) {
      validatePattern(associatedId, UUID_PATTERN, FILE_METADATA_INVALID_ASSOCIATED_ID_FORMAT);
    }
  }

  private static void validateUploadedByUserId(String uploadedByUserId) {
    // Null 허용 (Id 값은 정제하지 않았기에 Empty 값 검증도 필요) TODO: empty일때 null 취급
    if (uploadedByUserId != null && !uploadedByUserId.isEmpty()) {
      validatePattern(
          uploadedByUserId, UUID_PATTERN, FILE_METADATA_INVALID_UPLOADED_BY_USER_ID_FORMAT);
    }
  }

  private static void validateStatus(FileStatus status) {
    validateNotNull(status, FILE_METADATA_STATUS_NULL);
  }
}
