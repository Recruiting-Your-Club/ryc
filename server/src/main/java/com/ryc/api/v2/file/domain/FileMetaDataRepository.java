package com.ryc.api.v2.file.domain;

import java.util.List;

public interface FileMetaDataRepository {
  FileMetaData save(FileMetaData fileMetaData);

  FileMetaData findById(String id);

  List<FileMetaData> findAllById(List<String> fileMetaDataIds);

  List<FileMetaData> findAllByAssociatedId(String associatedId);

  List<FileMetaData> saveAll(List<FileMetaData> fileMetaDataList);
}
