package com.ryc.api.v2.s3.infra;

import com.ryc.api.v2.s3.domain.FileMetaData;
import com.ryc.api.v2.s3.domain.FileMetaDataRepository;
import com.ryc.api.v2.s3.infra.jpa.FileMetadataJpaRepository;
import com.ryc.api.v2.s3.infra.mapper.FileMetaDataMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class FileMetaDataRepositoryImpl implements FileMetaDataRepository {

    private final FileMetadataJpaRepository fileMetadataJpaRepository;

    @Override
    public FileMetaData save(FileMetaData fileMetaData) {
        return FileMetaDataMapper.toDomain(fileMetadataJpaRepository.save(FileMetaDataMapper.toEntity(fileMetaData)));
    }
}
