package com.ryc.api.v2.announcement.infra;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.jpa.*;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementMapper;
import com.ryc.api.v2.applicationForm.domain.enums.PersonalInfoQuestionType;
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
            .filter(a -> !a.getIsDeleted())
            .orElseThrow(() -> new NoSuchElementException("announcement not found"));

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
              .orElseThrow(() -> new NoSuchElementException("announcement not found"));

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

  @Override
  public boolean imageAllowed(String announcementId) {
    return announcementJpaRepository
        .findById(announcementId)
        .filter(announcementEntity -> !announcementEntity.getIsDeleted())
        .orElseThrow(() -> new NoSuchElementException("announcement not found"))
        .getApplicationForm()
        .getPersonalInfoQuestions()
        .contains(PersonalInfoQuestionType.PROFILE_IMAGE);
  }

  @Override
  public String findClubNameByAnnouncementId(String announcementId) {
    return announcementJpaRepository
        .findClubNameByAnnouncementId(announcementId)
        .orElseThrow(
            () ->
                new NoSuchElementException("Club not found for announcementId: " + announcementId));
  }

  @Override
  public List<String> findIdsByClubId(String clubId) {
    return announcementJpaRepository.findIdsByClubId(clubId);
  }

  @Override
  public void deleteAllByIdIn(List<String> announcementIds) {
    announcementJpaRepository.deleteByIdIn(announcementIds);
  }
}
