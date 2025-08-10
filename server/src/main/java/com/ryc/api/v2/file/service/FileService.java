package com.ryc.api.v2.file.service;

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
    return String.format(fileDomainType.getPrefix(), associatedId, newFileName);
  }

  /**
   * file의 소유권 (associatedId) 등록
   *
   * @param fileMetaDataIds
   * @param associatedId
   */
  public void claimOwnership(List<String> fileMetaDataIds, String associatedId, boolean isSync) {
    if (fileMetaDataIds.isEmpty()) return;

    // 1. 요청 Id List로 파일 Metadata 불러오기
    List<FileMetaData> newFiles = fileMetaDataRepository.findAllById(fileMetaDataIds);

    // size가 다른경우 잘못된 요청
    if (newFiles.size() != fileMetaDataIds.size()) {
      throw new RuntimeException("file not found");
    }

    List<FileMoveRequest> fileMoveRequests = new ArrayList<>();

    // 2. 기존 연관 객체의 파일 불러오기
    Map<String, FileMetaData> existingFileMap =
        fileMetaDataRepository.findAllByAssociatedId(associatedId).stream()
            .collect(Collectors.toMap(FileMetaData::getId, Function.identity()));

    // 3. 기존 파일 삭제 처리
    List<FileMetaData> filesToUpdate =
        existingFileMap.values().stream()
            .filter(fileMetaData -> !fileMetaDataIds.contains(fileMetaData.getId()))
            .map(FileMetaData::delete)
            .collect(Collectors.toCollection(ArrayList::new));

    // 4. 새로운 파 순서 업데이트 및 associatedId 변경
    IntStream.range(0, newFiles.size())
        .forEach(
            i -> {
              FileMetaData fileMetaData = newFiles.get(i);

              if (existingFileMap.containsKey(fileMetaData.getId())) {
                filesToUpdate.add(fileMetaData.updateDisplayOrder(i));
              } else {
                fileMetaData = fileMetaData.claimOwnership(associatedId, i);
                filesToUpdate.add(fileMetaData);
                fileMoveRequests.add(
                    FileMoveRequest.builder()
                        .fileMetadataId(fileMetaData.getId())
                        .tempS3Key(fileMetaData.getFilePath())
                        .finalS3Key(
                            generateFinalS3Key(
                                fileMetaData.getFileDomainType(),
                                associatedId,
                                fileMetaData.getOriginalFileName()))
                        .build());
              }
            });

    // 5. 파일 이동 동기/비동기 분기 처리
    if (isSync) {
      for (FileMoveRequest fileMoveRequest : fileMoveRequests) {
        s3FileStorage.moveFile(fileMoveRequest.tempS3Key(), fileMoveRequest.finalS3Key());
        s3FileStorage.deleteFile(fileMoveRequest.tempS3Key());
      }
    } else {
      eventPublisher.publishEvent(new FileMoveEvent(this, fileMoveRequests));
    }
    // 6. 저장
    fileMetaDataRepository.saveAll(filesToUpdate);
  }

  private String generateTempS3Key(String fileName) {
    // 1. 시간 기반 폴더 경로
    String datePath = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
    // 2. uuid 기반 파일명
    String uuid = UUID.randomUUID().toString();

    return String.format("temp/%s/%s/%s", datePath, uuid, fileName);
  }
}
