package com.ryc.api.v2.file.infra.event;

import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.domain.FileMetaDataRepository;
import com.ryc.api.v2.file.domain.event.FileMoveEvent;
import com.ryc.api.v2.file.domain.event.FileMoveRequest;
import com.ryc.api.v2.file.infra.S3FileStorage;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class FileEventListener {

  private final S3FileStorage s3FileStorage;
  private final FileMetaDataRepository fileMetaDataRepository;

  // 비동기
  @Async
  // 새로운 Transaction 요청
  @Transactional(propagation = Propagation.REQUIRES_NEW)
  // 기존 Transaction 커밋 완료되면 실행
  @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
  public void handleFileMoveEvents(FileMoveEvent fileMoveEvent) {
    List<FileMoveRequest> events = fileMoveEvent.getRequests();
    // 1. Id리스트 불러오기
    log.info("start move {} files", events.size());
    List<String> fileIds = events.stream().map(FileMoveRequest::fileMetadataId).toList();

    // 2. 조회 커리 한번만 수행
    Map<String, FileMetaData> fileMetaDataMap =
        fileMetaDataRepository.findAllById(fileIds).stream()
            .collect(java.util.stream.Collectors.toMap(FileMetaData::getId, Function.identity()));

    // 3. event처리
    for (FileMoveRequest event : events) {
      try {
        FileMetaData fileMetaData = fileMetaDataMap.get(event.fileMetadataId());

        if (fileMetaData == null) {
          log.error("failed move file : fileMetadataId={}", event.fileMetadataId());
          continue;
        }

        s3FileStorage.moveFile(event.tempS3Key(), event.finalS3Key());

        s3FileStorage.deleteFile(event.tempS3Key());

        // 3. metadata Update
        fileMetaDataRepository.save(fileMetaData.issueFileMoveSuccess(event.finalS3Key()));
      } catch (Exception e) {
        log.error(
            "failed move file : fileMetadataId={}, error = {}",
            event.fileMetadataId(),
            e.getMessage());
      }
    }
  }
}
