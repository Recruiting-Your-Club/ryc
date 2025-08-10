package com.ryc.api.v2.announcement.infra.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.applicationForm.domain.ApplicationForm;
import com.ryc.api.v2.applicationForm.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.applicationForm.infra.mapper.ApplicationFormMapper;

public class AnnouncementMapper {

  /** entity to domain */
  public static Announcement toDomain(AnnouncementEntity announcementEntity) {

    List<Tag> tags =
        announcementEntity.getTags().stream().map(AnnouncementTagMapper::toDomain).toList();
    ApplicationForm application =
        ApplicationFormMapper.toDomain(announcementEntity.getApplicationForm());
    AnnouncementPeriodInfo periodInfo =
        AnnouncementPeriodInfoMapper.toDomain(announcementEntity.getAnnouncementPeriodInfoVO());

    return Announcement.builder()
        .id(announcementEntity.getId())
        .title(announcementEntity.getTitle())
        .clubId(announcementEntity.getClubId())
        .numberOfPeople(announcementEntity.getNumberOfPeople())
        .detailDescription(announcementEntity.getDetailDescription())
        .summaryDescription(announcementEntity.getSummaryDescription())
        .target(announcementEntity.getTarget())
        .tags(tags)
        .applicationForm(application)
        .announcementPeriodInfo(periodInfo)
        .announcementStatus(announcementEntity.getAnnouncementStatus())
        .activityPeriod(announcementEntity.getActivityPeriod())
        .announcementType(announcementEntity.getAnnouncementType())
        .hasInterview(announcementEntity.getHasInterview())
        .isDeleted(announcementEntity.getIsDeleted())
        .build();
  }

  /** Domain to Entity */
  public static AnnouncementEntity toEntity(Announcement announcement) {
    List<TagVO> tags =
        announcement.getTags().stream()
            .map(AnnouncementTagMapper::toVO)
            .collect(Collectors.toCollection(ArrayList::new));

    AnnouncementPeriodInfoVO periodInfoVO =
        AnnouncementPeriodInfoMapper.toVO(announcement.getAnnouncementPeriodInfo());

    ApplicationFormEntity applicationForm =
        ApplicationFormMapper.toEntity(announcement.getApplicationForm());

    return AnnouncementEntity.builder()
        .clubId(announcement.getClubId())
        .applicationForm(applicationForm)
        .id(announcement.getId())
        .title(announcement.getTitle())
        .numberOfPeople(announcement.getNumberOfPeople())
        .detailDescription(announcement.getDetailDescription())
        .target(announcement.getTarget())
        .tags(tags)
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
