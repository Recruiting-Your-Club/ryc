package com.ryc.api.v2.announcement.infra.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

@Repository
public interface FileMetadataJpaRepository extends JpaRepository<FileMetadataEntity, String> {}
