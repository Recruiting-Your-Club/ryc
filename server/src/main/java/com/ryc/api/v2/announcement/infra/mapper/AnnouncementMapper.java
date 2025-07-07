package com.ryc.api.v2.announcement.infra.mapper;

import java.util.List;

import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.ApplicationForm;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementMapper {

  private final AnnouncementPeriodInfoMapper periodInfoMapper;
  private final ApplicationFormMapper applicationFormMapper;
  private final AnnouncementTagMapper tagMapper;
  private final ImageMapper imageMapper;

  /** entity to domain */
  public Announcement toDomain(AnnouncementEntity announcementEntity) {

    List<Tag> tags = announcementEntity.getTags().stream().map(tagMapper::toDomain).toList();
    List<Image> images =
        announcementEntity.getImages().stream().map(imageMapper::toDomain).toList();
    ApplicationForm application =
        applicationFormMapper.toDomain(announcementEntity.getApplicationForm());
    AnnouncementPeriodInfo periodInfo =
        periodInfoMapper.toDomain(announcementEntity.getAnnouncementPeriodInfoVO());

    return Announcement.builder()
        .id(announcementEntity.getId())
        .title(announcementEntity.getTitle())
        .clubId(announcementEntity.getClubId())
        .numberOfPeople(announcementEntity.getNumberOfPeople())
        .detailDescription(announcementEntity.getDetailDescription())
        .summaryDescription(announcementEntity.getSummaryDescription())
        .target(announcementEntity.getTarget())
        .tags(tags)
        .images(images)
        .applicationForm(application)
        .announcementPeriodInfo(periodInfo)
        .announcementStatus(announcementEntity.getAnnouncementStatus())
        .activityPeriod(announcementEntity.getActivityPeriod())
        .applicationForm(application)
        .announcementType(announcementEntity.getAnnouncementType())
        .hasInterview(announcementEntity.getHasInterview())
        .isDeleted(announcementEntity.getIsDeleted())
        .build();
  }

  /** Domain to Entity */
  public AnnouncementEntity toEntity(Announcement announcement) {
    List<TagVO> tags = announcement.getTags().stream().map(tagMapper::toVO).toList();

    List<ImageVO> images = announcement.getImages().stream().map(imageMapper::toVO).toList();
    AnnouncementPeriodInfoVO periodInfoVO =
        periodInfoMapper.toVO(announcement.getAnnouncementPeriodInfo());

    ApplicationFormEntity applicationForm =
        applicationFormMapper.toEntity(announcement.getApplicationForm());

    return AnnouncementEntity.builder()
        .clubId(announcement.getClubId())
        .applicationForm(applicationForm)
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
