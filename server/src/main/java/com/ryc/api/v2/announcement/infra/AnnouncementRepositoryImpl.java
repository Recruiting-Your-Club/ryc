package com.ryc.api.v2.announcement.infra;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementImage;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.jpa.*;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementMapper;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;
import com.ryc.api.v2.s3.infra.jpa.FileMetadataJpaRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AnnouncementRepositoryImpl implements AnnouncementRepository {
  private final AnnouncementJpaRepository announcementJpaRepository;
  private final FileMetadataJpaRepository fileMetadataJpaRepository; // FileMetadataJpaRepository 추가

  @Override
  public List<Announcement> findAllByClubId(String clubId) {
    List<AnnouncementEntity> announcementEntities =
        announcementJpaRepository.findAllByClubId(clubId);

    return announcementEntities.stream().map(AnnouncementMapper::toDomain).toList();
  }

  /**
   * Announcement with Application
   *
   * @param id announcementId
   */
  @Override
  public Announcement findById(String id) {
    AnnouncementEntity announcementEntity =
        announcementJpaRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("announcement not found"));

    return AnnouncementMapper.toDomain(announcementEntity);
  }

  @Override
  public Announcement save(Announcement announcement) {
    List<String> fileMetadataIds =
        announcement.getImages().stream().map(image -> image.getFileMetadataId()).toList();

    Map<String, FileMetadataEntity> fileMetadataMap =
        fileMetadataJpaRepository.findAllById(fileMetadataIds).stream()
            .collect(Collectors.toMap(FileMetadataEntity::getId, entity -> entity));

    // create
    if (announcement.getId().equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) {
      AnnouncementEntity announcementEntity =
          AnnouncementMapper.toEntity(announcement, fileMetadataMap);
      announcementEntity.getApplicationForm().setAnnouncement(announcementEntity);
      announcementEntity.getImages().forEach(image -> image.setAnnouncement(announcementEntity));

      AnnouncementEntity savedAnnouncement = announcementJpaRepository.save(announcementEntity);
      return AnnouncementMapper.toDomain(savedAnnouncement);
    }
    // update
    else {
      AnnouncementEntity announcementEntity =
          announcementJpaRepository
              .findById(announcement.getId())
              .orElseThrow(() -> new EntityNotFoundException("announcement not found"));

      AnnouncementEntity updatedInfoEntity =
          AnnouncementMapper.toEntity(announcement, fileMetadataMap);
      announcementEntity.update(updatedInfoEntity);
      announcementEntity.getApplicationForm().setAnnouncement(announcementEntity);

      AnnouncementEntity savedAnnouncement = announcementJpaRepository.save(announcementEntity);

      return AnnouncementMapper.toDomain(savedAnnouncement);
    }
  }

  @Override
  public List<Announcement> findAllByIsDeleted(Boolean isDeleted) {
    return announcementJpaRepository.findAllByIsDeleted(isDeleted).stream()
        .map(AnnouncementMapper::toDomain)
        .toList();
  }

  @Override
  public void saveAll(List<Announcement> announcements) {
    List<String> allFileMetadataIds =
        announcements.stream()
            .flatMap(ann -> ann.getImages().stream())
            .map(AnnouncementImage::getFileMetadataId)
            .distinct()
            .toList();

    java.util.Map<String, FileMetadataEntity> fileMetadataMap =
        fileMetadataJpaRepository.findAllById(allFileMetadataIds).stream()
            .collect(
                Collectors.toMap(FileMetadataEntity::getId, entity -> entity));

    List<AnnouncementEntity> announcementEntities =
        announcements.stream()
            .map(domain -> AnnouncementMapper.toEntity(domain, fileMetadataMap))
            .toList();

    announcementEntities.forEach(
        announcementEntity -> {
          announcementEntity.getApplicationForm().setAnnouncement(announcementEntity);
          announcementEntity
              .getImages()
              .forEach(image -> image.setAnnouncement(announcementEntity));
        });
    announcementJpaRepository.saveAll(announcementEntities);
  }

  @Override
  public List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds) {
    return announcementJpaRepository.getStatusesByClubIds(clubIds);
  }
}
