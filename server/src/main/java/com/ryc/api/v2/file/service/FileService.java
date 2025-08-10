package com.ryc.api.v2.file.service;

import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.domain.FileMetaDataRepository;
import com.ryc.api.v2.file.domain.FileStatus;
import com.ryc.api.v2.file.domain.event.FileMoveEvent;
import com.ryc.api.v2.file.domain.event.FileMoveRequest;
import com.ryc.api.v2.file.infra.S3FileStorage;
import com.ryc.api.v2.file.presentation.dto.request.UploadConfirmRequest;
import com.ryc.api.v2.file.presentation.dto.request.UploadUrlRequest;
import com.ryc.api.v2.file.presentation.dto.response.UploadUrlResponse;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.services.s3.model.*;

@Service
@RequiredArgsConstructor
public class FileService {
  private final FileMetaDataRepository fileMetaDataRepository;
  private final ApplicationEventPublisher eventPublisher;
  private final S3FileStorage s3FileStorage;

  @Value("${CLOUD_AWS_CDN_DOMAIN}")
  private String cdnDomain;

  @Transactional
  public UploadUrlResponse getUploadPresignedUrl(UploadUrlRequest request) {

    // 1. String to enum && contentType validate
    FileDomainType fileDomainType = FileDomainType.from(request.fileType());
    fileDomainType.checkContentType(request.contentType());

    // 2. s3 key 생성
    String s3Key = generateTempS3Key(request.fileName());
    // 3. fileMetaData 생성
    FileMetaData fileMetaData = FileMetaData.initialize(request, s3Key);

    FileMetaData savedFileMetaData = fileMetaDataRepository.save(fileMetaData);

    String presignedUrl = s3FileStorage.getUploadPresignedUrl(s3Key, request.contentType());

    return UploadUrlResponse.builder()
        .presignedUrl(presignedUrl)
        .fileMetadataId(savedFileMetaData.getId())
        .build();
  }

  @Transactional
  public void confirmUpload(UploadConfirmRequest request) {
    FileMetaData fileMetaData = fileMetaDataRepository.findById(request.fileMetadataId());

    HeadObjectResponse response = s3FileStorage.getMetaData(fileMetaData.getFilePath());

    fileMetaDataRepository.save(fileMetaData.confirmUpload(response.contentLength()));
  }

  @Transactional
  public void deleteFile(String fileMetaDataId) {
    FileMetaData fileMetaData = fileMetaDataRepository.findById(fileMetaDataId);

    s3FileStorage.deleteFile(fileMetaData.getFilePath());

    fileMetaDataRepository.save(fileMetaData.delete());
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

  private String generateFinalS3Key(
      FileDomainType fileDomainType, String associatedId, String fileName) {
    String newFileName = String.format("%s_%s", UUID.randomUUID(), fileName);
    String sanitizedFileName = sanitizeFileName(newFileName);

    return String.format(fileDomainType.getPrefix(), associatedId, sanitizedFileName);
  }

  private List<FileMetaData> processAssociatedFiles(List<String> fileIds, String associatedId) {
    // 1. 요청된 파일 목록 유효성 검증
    List<FileMetaData> newFiles = fileMetaDataRepository.findAllById(fileIds);
    if (newFiles.size() != fileIds.size()) {
      // TODO: exception
    }

    // 2. 기존에 연결되어 있는 파일 조회
    List<FileMetaData> existingFiles = fileMetaDataRepository.findAllByAssociatedId(associatedId);
    Map<String, FileMetaData> existingFileMap =
        existingFiles.stream().collect(Collectors.toMap(FileMetaData::getId, Function.identity()));

    // 3. 기존 파일 중 제거되지 못한 파일 제거
    List<FileMetaData> filesToUpdate =
        existingFileMap.values().stream()
            .filter(fileMetaData -> !fileIds.contains(fileMetaData.getId()))
            .map(FileMetaData::delete)
            .collect(Collectors.toCollection(ArrayList::new));

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
  public void claimOwnershipSync(List<String> fileMetaDataIds, String associatedId) {
    if (fileMetaDataIds == null || fileMetaDataIds.isEmpty()) return;

    List<FileMetaData> filesToUpdate = processAssociatedFiles(fileMetaDataIds, associatedId);

    for (int i = 0; i < filesToUpdate.size(); i++) {
      FileMetaData fileMetaData = filesToUpdate.get(i);

      if (fileMetaData.getStatus() == FileStatus.MOVE_REQUESTED) {
        String tempS3Key = fileMetaData.getFilePath();
        String finalS3Key =
            generateFinalS3Key(
                fileMetaData.getFileDomainType(), associatedId, fileMetaData.getOriginalFileName());

        try {
          s3FileStorage.moveFile(tempS3Key, finalS3Key);
          s3FileStorage.deleteFile(tempS3Key);

          filesToUpdate.set(i, fileMetaData.issueFileMoveSuccess(finalS3Key));
        } catch (Exception e) {
          filesToUpdate.set(i, fileMetaData.issueFileMoveFail());
        }
      }
    }

    fileMetaDataRepository.saveAll(filesToUpdate);
  }

  @Transactional
  public void claimOwnershipAsync(List<String> fileMetaDataIds, String associatedId) {
    if (fileMetaDataIds == null || fileMetaDataIds.isEmpty()) return;

    List<FileMetaData> filesToUpdate = processAssociatedFiles(fileMetaDataIds, associatedId);

    // 1. dlqpsxm todtjd
    List<FileMoveRequest> moveRequests =
        filesToUpdate.stream()
            .filter(fileMetaData -> fileMetaData.getStatus() == FileStatus.MOVE_REQUESTED)
            .map(
                fileMetaData ->
                    FileMoveRequest.builder()
                        .fileMetadataId(fileMetaData.getId())
                        .tempS3Key(fileMetaData.getFilePath())
                        .finalS3Key(
                            generateFinalS3Key(
                                fileMetaData.getFileDomainType(),
                                associatedId,
                                fileMetaData.getOriginalFileName()))
                        .build())
            .toList();

    // 2. 이벤트 발행
    if (!moveRequests.isEmpty()) {
      eventPublisher.publishEvent(new FileMoveEvent(this, moveRequests));
    }

    // 3. 저장
    fileMetaDataRepository.saveAll(filesToUpdate);
  }

  private String generateTempS3Key(String fileName) {
    // 1. 시간 기반 폴더 경로
    String datePath = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    // 2. uuid 기반 파일명
    String uuid = UUID.randomUUID().toString();

    String sanitizedFileName = sanitizeFileName(fileName);

    return String.format("temp/%s/%s_%s", datePath, uuid, sanitizedFileName);
  }

  private String sanitizeFileName(String fileName) {
    return new File(fileName).getName().replaceAll("[^a-zA-Z0-9._-]", "_");
  }
}
