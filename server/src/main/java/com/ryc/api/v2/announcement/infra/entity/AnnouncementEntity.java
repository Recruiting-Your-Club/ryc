package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "announcements")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AnnouncementEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String title;

    private String numberOfPeople;

    @Column(columnDefinition = "TEXT")
    private String description;
    private String target;

    @Embedded
    AnnouncementPeriodInfoVO announcementPeriodInfoVO;

    @ElementCollection
    @CollectionTable(name = "announcement_images")
    private List<ImageVO> imageVOS;

    @ElementCollection
    @CollectionTable(name = "announcement_tags")
    private List<TagVO> tagVOS;

    private String activityPeriod;

    private Boolean isDeleted;

}
