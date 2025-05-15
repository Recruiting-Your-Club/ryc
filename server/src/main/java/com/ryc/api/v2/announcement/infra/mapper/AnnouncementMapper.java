package com.ryc.api.v2.announcement.infra.mapper;

import com.ryc.api.v2.announcement.domain.Announcement;
import com.ryc.api.v2.announcement.domain.AnnouncementApplication;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.vo.AnnouncementPeriodInfo;
import com.ryc.api.v2.announcement.domain.vo.Image;
import com.ryc.api.v2.announcement.domain.vo.Tag;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementApplicationEntity;
import com.ryc.api.v2.announcement.infra.entity.AnnouncementEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class AnnouncementMapper {

    private final AnnouncementPeriodInfoMapper periodInfoMapper;
    private final AnnouncementApplicationMapper applicationMapper;
    private final AnnouncementTagMapper tagMapper;
    private final AnnouncementImageMapper imageMapper;
    private final AnnouncementPeriodInfoMapper infoMapper;

    public Announcement toDomain(AnnouncementEntity entity) {
        return toDomain(entity, null);
    }

    public Announcement toDomain(AnnouncementEntity entity, AnnouncementApplicationEntity applicationEntity) {

        List<Tag> tags = entity.getTags().stream().map(tagMapper::toDomain).toList();
        List<Image> images = entity.getImages().stream().map(imageMapper::toDomain).toList();
        AnnouncementApplication application = applicationMapper.toDomain(applicationEntity);
        AnnouncementPeriodInfo periodInfo = periodInfoMapper.toDomain(entity.getAnnouncementPeriodInfoVO());

        return Announcement.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .numberOfPeople(entity.getNumberOfPeople())
                .detailDescription(entity.getDetailDescription())
                .summaryDescription(entity.getSummaryDescription())
                .target(entity.getTarget())
                .tags(tags)
                .images(images)
                .announcementPeriod(periodInfo)
                .activityPeriod(entity.getActivityPeriod())
                .announcementApplication(application)
                .build();
    }

    public AnnouncementEntity toEntity(Announcement announcement) {
        List<TagVO> tags = announcement.getTags().stream().map(tagMapper::toVO).toList();
        List<ImageVO> images = announcement.getImages().stream().map(imageMapper::toVO).toList();
        AnnouncementPeriodInfoVO periodInfoVO = infoMapper.toVO(announcement.getAnnouncementPeriod());

        return AnnouncementEntity.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .numberOfPeople(announcement.getNumberOfPeople())
                .detailDescription(announcement.getDetailDescription())
                .target(announcement.getTarget())
                .tags(tags)
                .images(images)
                .isDeleted(announcement.getAnnouncementStatus() == AnnouncementStatus.CLOSED)
                .announcementPeriodInfoVO(periodInfoVO)
                .activityPeriod(announcement.getActivityPeriod())
                .build();
    }

}
