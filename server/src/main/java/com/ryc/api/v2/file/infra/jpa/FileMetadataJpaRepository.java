package com.ryc.api.v2.file.infra.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.file.infra.entity.FileMetadataEntity;

@Repository
public interface FileMetadataJpaRepository extends JpaRepository<FileMetadataEntity, String> {
  List<FileMetadataEntity> findAllByAssociatedIdOrderByDisplayOrderAsc(String associatedId);
}
