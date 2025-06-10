package com.ryc.api.v2.announcement.infra.mapper;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementApplication;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.club.infra.entity.ClubEntity;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementMapper {

  private final AnnouncementPeriodInfoMapper periodInfoMapper;
  private final AnnouncementApplicationMapper applicationMapper;
  private final AnnouncementTagMapper tagMapper;
  private final ImageMapper imageMapper;

  @PersistenceContext private final EntityManager entityManager;

  /** entity to domain */
  public Announcement toDomain(
      AnnouncementEntity announcementEntity, AnnouncementApplicationEntity applicationEntity) {

    List<Tag> tags = announcementEntity.getTags().stream().map(tagMapper::toDomain).toList();
    List<Image> images =
        announcementEntity.getImages().stream().map(imageMapper::toDomain).toList();
    AnnouncementApplication application = applicationMapper.toDomain(applicationEntity);
    AnnouncementPeriodInfo periodInfo =
        periodInfoMapper.toDomain(announcementEntity.getAnnouncementPeriodInfoVO());

    return Announcement.builder()
        .id(announcementEntity.getId())
        .title(announcementEntity.getTitle())
        .numberOfPeople(announcementEntity.getNumberOfPeople())
        .detailDescription(announcementEntity.getDetailDescription())
        .summaryDescription(announcementEntity.getSummaryDescription())
        .target(announcementEntity.getTarget())
        .tags(tags)
        .images(images)
        .announcementPeriodInfo(periodInfo)
        .announcementStatus(announcementEntity.getAnnouncementStatus())
        .activityPeriod(announcementEntity.getActivityPeriod())
        .announcementApplication(application)
        .announcementType(announcementEntity.getAnnouncementType())
        .hasInterview(announcementEntity.getHasInterview())
        .isDeleted(announcementEntity.getIsDeleted())
        .build();
  }

  public Announcement toDomain(AnnouncementEntity announcementEntity) {

    List<Tag> tags = announcementEntity.getTags().stream().map(tagMapper::toDomain).toList();
    List<Image> images =
        announcementEntity.getImages().stream().map(imageMapper::toDomain).toList();
    AnnouncementPeriodInfo periodInfo =
        periodInfoMapper.toDomain(announcementEntity.getAnnouncementPeriodInfoVO());

    return Announcement.builder()
        .id(announcementEntity.getId())
        .clubId(announcementEntity.getClubEntity().getId())
        .title(announcementEntity.getTitle())
        .numberOfPeople(announcementEntity.getNumberOfPeople())
        .detailDescription(announcementEntity.getDetailDescription())
        .summaryDescription(announcementEntity.getSummaryDescription())
        .target(announcementEntity.getTarget())
        .tags(tags)
        .images(images)
        .announcementPeriodInfo(periodInfo)
        .activityPeriod(announcementEntity.getActivityPeriod())
        .announcementType(announcementEntity.getAnnouncementType())
        .hasInterview(announcementEntity.getHasInterview())
        .isDeleted(announcementEntity.getIsDeleted())
        .createdAt(announcementEntity.getCreatedAt())
        .updatedAt(announcementEntity.getUpdatedAt())
        .announcementStatus(announcementEntity.getAnnouncementStatus())
        .build();
  }

  /** Domain to Entity */
  public AnnouncementEntity toEntity(Announcement announcement) {
    List<TagVO> tags = announcement.getTags().stream().map(tagMapper::toVO).toList();
    List<ImageVO> images = announcement.getImages().stream().map(imageMapper::toVO).toList();
    AnnouncementPeriodInfoVO periodInfoVO =
        periodInfoMapper.toVO(announcement.getAnnouncementPeriodInfo());

    // proxy 객체 주입
    ClubEntity club = entityManager.getReference(ClubEntity.class, announcement.getClubId());

    return AnnouncementEntity.builder()
        .clubEntity(club)
        .id(announcement.getId())
        .title(announcement.getTitle())
        .numberOfPeople(announcement.getNumberOfPeople())
        .detailDescription(announcement.getDetailDescription())
        .target(announcement.getTarget())
        .tags(tags)
        .images(images)
        .announcementStatus(announcement.getAnnouncementStatus())
        .announcementPeriodInfoVO(periodInfoVO)
        .activityPeriod(announcement.getActivityPeriod())
        .announcementType(announcement.getAnnouncementType())
        .hasInterview(announcement.getHasInterview())
        .summaryDescription(announcement.getSummaryDescription())
        .isDeleted(announcement.getIsDeleted())
        .build();
  }
}
