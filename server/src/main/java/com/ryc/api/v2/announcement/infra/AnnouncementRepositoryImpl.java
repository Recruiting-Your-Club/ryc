package com.ryc.api.v2.announcement.infra;

import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.jpa.*;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementMapper;
import com.ryc.api.v2.common.constant.DomainDefaultValues;
import com.ryc.api.v2.file.infra.jpa.FileMetadataJpaRepository;

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
    // create
    if (announcement.getId().equals(DomainDefaultValues.DEFAULT_INITIAL_ID)) {
      AnnouncementEntity announcementEntity = AnnouncementMapper.toEntity(announcement);
      announcementEntity.getApplicationForm().setAnnouncement(announcementEntity);

      AnnouncementEntity savedAnnouncement = announcementJpaRepository.save(announcementEntity);
      return AnnouncementMapper.toDomain(savedAnnouncement);
    }
    // update
    else {
      AnnouncementEntity announcementEntity =
          announcementJpaRepository
              .findById(announcement.getId())
              .orElseThrow(() -> new EntityNotFoundException("announcement not found"));

      AnnouncementEntity updatedInfoEntity = AnnouncementMapper.toEntity(announcement);
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

    List<AnnouncementEntity> announcementEntities =
        announcements.stream().map(domain -> AnnouncementMapper.toEntity(domain)).toList();

    announcementEntities.forEach(
        announcementEntity -> {
          announcementEntity.getApplicationForm().setAnnouncement(announcementEntity);
        });
    announcementJpaRepository.saveAll(announcementEntities);
  }

  @Override
  public List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds) {
    return announcementJpaRepository.getStatusesByClubIds(clubIds);
  }
}
