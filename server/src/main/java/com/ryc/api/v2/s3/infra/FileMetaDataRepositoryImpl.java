package com.ryc.api.v2.s3.infra;

import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.s3.domain.FileMetaData;
import com.ryc.api.v2.s3.domain.FileMetaDataRepository;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;
import com.ryc.api.v2.s3.infra.jpa.FileMetadataJpaRepository;
import com.ryc.api.v2.s3.infra.mapper.FileMetaDataMapper;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class FileMetaDataRepositoryImpl implements FileMetaDataRepository {

    private final FileMetadataJpaRepository fileMetadataJpaRepository;

    @Override
    public FileMetaData save(FileMetaData fileMetaData) {
        if(fileMetaData.getId().equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) {
            return FileMetaDataMapper.toDomain(fileMetadataJpaRepository.save(FileMetaDataMapper.toEntity(fileMetaData)));
        }
        else{
            FileMetadataEntity fileMetadataEntity = fileMetadataJpaRepository.findById(fileMetaData.getId()).orElseThrow(() -> new EntityNotFoundException("fileMetaData not found"));

            fileMetadataEntity.update(FileMetaDataMapper.toEntity(fileMetaData));
            return FileMetaDataMapper.toDomain(fileMetadataEntity);
        }
    }

    @Override
    public FileMetaData findById(String id) {
        return FileMetaDataMapper.toDomain(fileMetadataJpaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("fileMetaData not found")));
    }
}
