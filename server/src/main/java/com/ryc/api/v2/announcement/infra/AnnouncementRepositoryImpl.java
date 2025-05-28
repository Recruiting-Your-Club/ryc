package com.ryc.api.v2.announcement.infra;

import java.util.List;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.jpa.*;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementApplicationMapper;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AnnouncementRepositoryImpl implements AnnouncementRepository {
  private final AnnouncementJpaRepository announcementJpaRepository;
  private final AnnouncementApplicationJpaRepository announcementApplicationJpaRepository;
  private final AnnouncementMapper announcementMapper;
  private final AnnouncementApplicationMapper announcementApplicationMapper;

  @Override
  public Announcement findById(String id) {
    AnnouncementEntity announcement =
        announcementJpaRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("announcement not found"));
    return announcementMapper.toDomain(announcement);
  }

  @Override
  public List<Announcement> findAllByClubId(String clubId) {
    List<AnnouncementEntity> announcementEntities =
        announcementJpaRepository.findAllByClubId(clubId);

    if (announcementEntities.isEmpty()) {
      throw new EntityNotFoundException("announcement not found");
    }

    return announcementEntities.stream().map(announcementMapper::toDomain).toList();
  }

  @Override
  public Announcement findByIdWithApplication(String id) {
    AnnouncementEntity announcementEntity =
        announcementJpaRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("announcement not found"));

    AnnouncementApplicationEntity applicationEntity =
        announcementApplicationJpaRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("announcementApplication not found"));

    return announcementMapper.toDomain(announcementEntity, applicationEntity);
  }

  @Override
  public Announcement save(Announcement announcement) {
    AnnouncementEntity announcementEntity = announcementMapper.toEntity(announcement);
    AnnouncementApplicationEntity announcementApplicationEntity =
        announcementApplicationMapper.toEntity(announcement.getAnnouncementApplication());

    AnnouncementEntity savedAnnouncementEntity = announcementJpaRepository.save(announcementEntity);
    AnnouncementApplicationEntity savedAnnouncementApplicationEntity =
        announcementApplicationJpaRepository.save(announcementApplicationEntity);

    return announcementMapper.toDomain(savedAnnouncementEntity, savedAnnouncementApplicationEntity);
  }
}
