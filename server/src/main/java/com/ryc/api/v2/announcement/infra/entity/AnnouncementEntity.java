package com.ryc.api.v2.announcement.infra.entity;

import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.ImageVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

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

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private ClubEntity clubEntity;

  private String title;

  private String numberOfPeople;

  private String summaryDescription;

  private Boolean hasInterview;

  @Column(columnDefinition = "TEXT")
  private String detailDescription;

  private String target;

  @Embedded AnnouncementPeriodInfoVO announcementPeriodInfoVO;

  @ElementCollection
  @OrderColumn(name = "image_order")
  @CollectionTable(name = "announcement_images")
  private List<ImageVO> images;

  @ElementCollection
  @OrderColumn(name = "tag_order")
  @CollectionTable(name = "announcement_tags")
  private List<TagVO> tags;

  private AnnouncementType announcementType;
  private String activityPeriod;

  @Enumerated(EnumType.STRING)
  private AnnouncementStatus announcementStatus;

  private Boolean isDeleted;
}
