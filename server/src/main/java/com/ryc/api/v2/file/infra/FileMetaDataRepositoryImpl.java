package com.ryc.api.v2.file.infra;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.file.domain.FileMetaData;
import com.ryc.api.v2.file.domain.FileMetaDataRepository;
import com.ryc.api.v2.file.infra.entity.FileMetadataEntity;
import com.ryc.api.v2.file.infra.jpa.FileMetadataJpaRepository;
import com.ryc.api.v2.file.infra.mapper.FileMetaDataMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class FileMetaDataRepositoryImpl implements FileMetaDataRepository {

  private final FileMetadataJpaRepository fileMetadataJpaRepository;

  @Override
  public FileMetaData save(FileMetaData fileMetaData) {
    if (fileMetaData.getId().equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) {
      return FileMetaDataMapper.toDomain(
          fileMetadataJpaRepository.save(FileMetaDataMapper.toEntity(fileMetaData)));
    } else {
      FileMetadataEntity fileMetadataEntity =
          fileMetadataJpaRepository
              .findById(fileMetaData.getId())
              .orElseThrow(() -> new NoSuchElementException("fileMetaData not found"));

      fileMetadataEntity.update(FileMetaDataMapper.toEntity(fileMetaData));
      return FileMetaDataMapper.toDomain(fileMetadataEntity);
    }
  }

  @Override
  public FileMetaData findById(String id) {
    return FileMetaDataMapper.toDomain(
        fileMetadataJpaRepository
            .findById(id)
            .filter(entity -> !entity.isDeleted())
            .orElseThrow(() -> new NoSuchElementException("fileMetaData not found")));
  }

  @Override
  public List<FileMetaData> findAllByIdIn(List<String> fileMetaDataIds) {
    return fileMetadataJpaRepository.findAllById(fileMetaDataIds).stream()
        .filter(entity -> !entity.isDeleted())
        .map(FileMetaDataMapper::toDomain)
        .toList();
  }

  @Override
  public List<FileMetaData> findAllByAssociatedId(String associatedId) {
    return fileMetadataJpaRepository
        .findAllByAssociatedIdOrderByDisplayOrderAsc(associatedId)
        .stream()
        .filter(entity -> !entity.isDeleted())
        .map(FileMetaDataMapper::toDomain)
        .toList();
  }

  @Override
  public List<FileMetaData> saveAll(List<FileMetaData> fileMetaDataList) {
    // 1. id 추출
    List<String> ids = fileMetaDataList.stream().map(FileMetaData::getId).toList();

    // 2. id로 Entity 조회
    Map<String, FileMetadataEntity> fileMetadataMap =
        fileMetadataJpaRepository.findAllById(ids).stream()
            .collect(Collectors.toMap(FileMetadataEntity::getId, Function.identity()));

    // 3. 둘이 개수 안맞으면 잘못된 요청
    if (fileMetaDataList.size() != fileMetadataMap.size()) {
      throw new NoSuchElementException("fileMetaData not found");
    }

    // 4. update
    fileMetaDataList.forEach(
        fileMetaData -> {
          FileMetadataEntity fileMetadataEntity = fileMetadataMap.get(fileMetaData.getId());
          fileMetadataEntity.update(FileMetaDataMapper.toEntity(fileMetaData));
        });

    return fileMetadataMap.values().stream().map(FileMetaDataMapper::toDomain).toList();
  }

  @Override
  public List<FileMetaData> findAllByAssociatedIdIn(List<String> associatedIds) {
    return fileMetadataJpaRepository
        .findAllByAssociatedIdInOrderByDisplayOrderAsc(associatedIds)
        .stream()
        .filter(entity -> !entity.isDeleted())
        .map(FileMetaDataMapper::toDomain)
        .toList();
  }
}
