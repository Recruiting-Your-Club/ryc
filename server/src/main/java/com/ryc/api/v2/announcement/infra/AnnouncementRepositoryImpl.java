package com.ryc.api.v2.announcement.infra;

import java.util.List;
import java.util.Map;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.stereotype.Repository;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementRepository;
import com.ryc.api.v2.announcement.domain.dto.ClubAnnouncementStatusDto;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.jpa.*;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementApplicationMapper;
import com.ryc.api.v2.announcement.infra.mapper.AnnouncementMapper;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class AnnouncementRepositoryImpl implements AnnouncementRepository {
  private final AnnouncementJpaRepository announcementJpaRepository;
  private final AnnouncementApplicationJpaRepository announcementApplicationJpaRepository;
  private final AnnouncementMapper announcementMapper;
  private final AnnouncementApplicationMapper announcementApplicationMapper;
  private final ClubJpaRepository clubJpaRepository;

  @Override
  public List<Announcement> findAllByClubId(String clubId) {
    List<AnnouncementEntity> announcementEntities =
        announcementJpaRepository.findAllByClubId(clubId);

    return announcementEntities.stream().map(announcementMapper::toDomain).toList();
  }

  /**
   * Announcement with Application
   *
   * @param id announcementId
   */
  @Override
  public Announcement findByIdWithApplication(String id) {
    AnnouncementEntity announcementEntity =
        announcementJpaRepository
            .findById(id)
            .orElseThrow(() -> new EntityNotFoundException("announcement not found"));

    /** todo n+1 해결 필요 */
    AnnouncementApplicationEntity applicationEntity =
        announcementApplicationJpaRepository
            .findByAnnouncementEntityId(announcementEntity.getId())
            .orElseThrow(() -> new EntityNotFoundException("announcementApplication not found"));

    return announcementMapper.toDomain(announcementEntity, applicationEntity);
  }

  @Override
  public Announcement save(Announcement announcement, ClubEntity club) {
    // 1. domain -> entity mapping
    AnnouncementEntity announcementEntity = announcementMapper.toEntity(announcement, club);
    AnnouncementApplicationEntity announcementApplicationEntity =
        announcementApplicationMapper.toEntity(
            announcement.getAnnouncementApplication(), announcementEntity, club);

    // 2. application entity save
    /** todo FK를 가진 application에서 OneToOne mapping을 진행해서 application을 저장하는 것이 옳은 방법인지 고민 필요. */
    AnnouncementApplicationEntity savedAnnouncementApplicationEntity =
        announcementApplicationJpaRepository.save(announcementApplicationEntity);

    return announcementMapper.toDomain(savedAnnouncementApplicationEntity.getAnnouncementEntity());
  }

  @Override
  public List<Announcement> findAllByIsDeleted(Boolean isDeleted) {
    return announcementJpaRepository.findAllByIsDeleted(isDeleted).stream()
        .map(announcementMapper::toDomain)
        .toList();
  }

  @Override
  public void saveAll(
      List<Announcement> announcements,
      Map<String, ClubEntity> clubs) { // List<ClubEntity> clubs) {

    List<AnnouncementEntity> announcementEntities =
        announcements.stream()
            .map(
                domain -> {
                  ClubEntity clubProxy = clubs.get(domain.getClubId());
                  return announcementMapper.toEntity(domain, clubProxy);
                })
            .toList();

    announcementJpaRepository.saveAll(announcementEntities);
  }

  @Override
  public List<ClubAnnouncementStatusDto> getStatusesByClubIds(List<String> clubIds) {
    return announcementJpaRepository.getStatusesByClubIds(clubIds);
  }
}
