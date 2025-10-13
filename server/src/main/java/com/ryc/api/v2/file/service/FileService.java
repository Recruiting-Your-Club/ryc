package com.ryc.api.v2.file.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.common.dto.response.FileGetResponse;
import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.file.common.exception.code.S3ErrorCode;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.domain.FileMetaDataRepository;
import com.ryc.api.v2.file.domain.FileStatus;
import com.ryc.api.v2.file.infra.S3FileStorage;
import com.ryc.api.v2.file.presentation.dto.request.AccessPresignedUrlGetRequest;
import com.ryc.api.v2.file.presentation.dto.request.UploadConfirmRequest;
import com.ryc.api.v2.file.presentation.dto.request.UploadUrlRequest;
import com.ryc.api.v2.file.presentation.dto.response.UploadUrlResponse;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.services.s3.model.*;

@Service
@RequiredArgsConstructor
public class FileService {
  private final FileMetaDataRepository fileMetaDataRepository;
  private final S3FileStorage s3FileStorage;

  @Value("${CLOUD_AWS_CDN_DOMAIN}")
  private String cdnDomain;

  @Transactional
  public UploadUrlResponse getUploadPresignedUrl(UploadUrlRequest request) {

    // 1. String to enum && contentType validate
    FileDomainType fileDomainType = FileDomainType.from(request.fileType());
    fileDomainType.checkContentType(request.contentType());

    // 2. s3 key 생성
    String s3Key = generateS3Key(fileDomainType, request.fileName());

    // 3. fileMetaData 생성
    FileMetaData fileMetaData = FileMetaData.initialize(request, s3Key);

    FileMetaData savedFileMetaData = fileMetaDataRepository.save(fileMetaData);

    String presignedUrl = s3FileStorage.getUploadPresignedUrl(s3Key, request.contentType());

    return UploadUrlResponse.builder()
        .accessToken(savedFileMetaData.getAccessToken())
        .presignedUrl(presignedUrl)
        .fileMetadataId(savedFileMetaData.getId())
        .build();
  }

  @Transactional
  public FileGetResponse getAccessUrl(AccessPresignedUrlGetRequest request) {
    FileMetaData fileMetaData = fileMetaDataRepository.findById(request.metadataId());

    if (fileMetaData.getFileDomainType().getIsPrivate()
        && !fileMetaData.isCorrectAccessToken(request.accessToken())) {
      throw new BusinessRuleException(S3ErrorCode.INVALID_ACCESS_TOKEN);
    }

    if (fileMetaData.getStatus() != FileStatus.UPLOAD_COMPLETED) {
      throw new BusinessRuleException(S3ErrorCode.INVALID_FILE_STATUS);
    }

    String presignedUrl;
    if (fileMetaData.getFileDomainType().getIsPrivate()) {
      presignedUrl = getPrivateFileGetUrl(fileMetaData);
    } else {
      presignedUrl = getPublicFileGetUrl(fileMetaData);
    }

    return FileGetResponse.builder()
        .id(fileMetaData.getId())
        .url(presignedUrl)
        .contentType(fileMetaData.getContentType())
        .originalFileName(fileMetaData.getOriginalFileName())
        .build();
  }

  @Transactional
  public void confirmUpload(UploadConfirmRequest request) {
    FileMetaData fileMetaData = fileMetaDataRepository.findById(request.fileMetadataId());

    if (fileMetaData.getStatus() != FileStatus.PENDING) {
      throw new BusinessRuleException(S3ErrorCode.DUPLICATED_CONFIRM_REQUEST);
    }

    HeadObjectResponse response = s3FileStorage.getMetaData(fileMetaData.getFilePath());

    fileMetaDataRepository.save(fileMetaData.confirmUpload(response.contentLength()));
  }

  public List<FileMetaData> findAllByAssociatedId(String associatedId) {
    return fileMetaDataRepository.findAllByAssociatedId(associatedId);
  }

  public String getPublicFileGetUrl(FileMetaData fileMetaData) {
    return String.format("%s/%s", cdnDomain, fileMetaData.getFilePath());
  }

  public String getPrivateFileGetUrl(FileMetaData fileMetaData) {
    return s3FileStorage.getPrivateFileGetUrl(fileMetaData.getFilePath());
  }

  private String generateS3Key(FileDomainType fileDomainType, String fileName) {
    // ensure key uniqueness and traceability by including fileId
    String sanitizedFileName = sanitizeFileName(fileName);
    String uuid = UUID.randomUUID().toString();
    String finalFileName = String.format("%s_%s", uuid, sanitizedFileName);
    String date =
        String.format(
            "%s/%s/%s",
            LocalDate.now().getYear(),
            LocalDate.now().getMonthValue(),
            LocalDate.now().getDayOfMonth());

    return String.format(fileDomainType.getPrefix(), date, finalFileName);
  }

  private void validateExpectedType(List<FileMetaData> files, FileDomainType expectedType) {
    if (expectedType == null) return;
    boolean anyMismatch = files.stream().anyMatch(f -> f.getFileDomainType() != expectedType);
    if (anyMismatch) {
      throw new IllegalArgumentException("fileDomainType mismatch with expectedType");
    }
  }

  private List<FileMetaData> processAssociatedFiles(
      List<String> fileIds, String associatedId, FileDomainType expectedType) {
    // 1. 요청된 파일 목록 유효성 검증
    List<FileMetaData> newFiles = fileMetaDataRepository.findAllByIdIn(fileIds);
    if (newFiles.size() != fileIds.size()) {
      throw new IllegalArgumentException("Some fileMetadataIds do not exist");
    }

    // 1-1. 기대 타입 검증
    validateExpectedType(newFiles, expectedType);

    // 2. 기존에 연결되어 있는 파일 조회
    Map<String, FileMetaData> existingFileMap =
        fileMetaDataRepository.findAllByAssociatedId(associatedId).stream()
            .filter(file -> file.getFileDomainType() == expectedType)
            .collect(Collectors.toMap(FileMetaData::getId, Function.identity()));

    // 3. 기존 파일 중 제거되지 못한 파일 제거
    List<FileMetaData> filesToUpdate =
        existingFileMap.values().stream()
            .filter(fileMetaData -> !fileIds.contains(fileMetaData.getId()))
            .map(FileMetaData::delete)
            .collect(Collectors.toCollection(ArrayList::new));

    // 3-1 s3 버킷에서는 실제로 삭제
    if (!filesToUpdate.isEmpty()) {
      s3FileStorage.deleteFiles(
          filesToUpdate.stream().map(FileMetaData::getFilePath).collect(Collectors.toList()));
    }

    // 4. 새로운 파일 목록 순서 업데이트, moveRequest처리
    IntStream.range(0, newFiles.size())
        .forEach(
            i -> {
              FileMetaData newFile = newFiles.get(i);
              if (existingFileMap.containsKey(newFile.getId())) {
                filesToUpdate.add(newFile.updateDisplayOrder(i));
              } else {
                filesToUpdate.add(newFile.claimOwnership(associatedId, i));
              }
            });

    return filesToUpdate;
  }

  @Transactional
  public void claimOwnership(
      String fileMetaDataId, String associatedId, FileDomainType expectedType) {
    List<String> fileMetaDataIds =
        (fileMetaDataId != null)
            ? Collections.singletonList(fileMetaDataId)
            : Collections.emptyList();
    claimOwnership(fileMetaDataIds, associatedId, expectedType);
  }

  @Transactional
  public void claimOwnership(
      List<String> fileMetaDataIds, String associatedId, FileDomainType expectedType) {
    if (fileMetaDataIds == null) return;

    List<FileMetaData> filesToUpdate =
        processAssociatedFiles(fileMetaDataIds, associatedId, expectedType);

    fileMetaDataRepository.saveAll(filesToUpdate);
  }

  public String sanitizeFileName(String fileName) {

    // 1. 경로 순회 문자열을 먼저 제거
    String sanitized = fileName.replace("..", "");

    // 2. 허용되지 않는 모든 문자를 '_'로 치환
    return sanitized.replaceAll("[^a-zA-Z0-9\\uAC00-\\uD7A3._-]", "_");
  }

  public List<FileMetaData> findAllByAssociatedIdIn(List<String> associatedIds) {
    return fileMetaDataRepository.findAllByAssociatedIdIn(associatedIds);
  }

  public Map<String, FileGetResponse> getPrivateFileResponsesForFileIds(List<String> fileIds) {
    if (fileIds == null || fileIds.isEmpty()) return Collections.emptyMap();
    List<FileMetaData> metas = fileMetaDataRepository.findAllByIdIn(fileIds);
    return metas.stream()
        .collect(
            Collectors.toMap(
                FileMetaData::getId, m -> FileGetResponse.of(m, getPrivateFileGetUrl(m))));
  }

  @Transactional
  public void deleteOrphanImage() {
    List<FileMetaData> orphanImages =
        fileMetaDataRepository.findAll().stream()
            .filter(this::isOrphanImage)
            .map(FileMetaData::delete)
            .toList();
    s3FileStorage.deleteFiles(orphanImages.stream().map(FileMetaData::getFilePath).toList());
    fileMetaDataRepository.saveAll(orphanImages);
  }

  public Boolean isOrphanImage(FileMetaData fileMetaData) {
    return fileMetaData.getStatus() == FileStatus.PENDING
        && LocalDateTime.now().isAfter(fileMetaData.getCreatedAt().plusDays(3));
  }
}
