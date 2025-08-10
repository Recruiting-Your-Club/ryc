package com.ryc.api.v2.announcement.infra.entity;

import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;
import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.applicationForm.infra.entity.ApplicationFormEntity;
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

  @Column(nullable = false, name = "club_id")
  private String clubId;

  private String title;

  private String numberOfPeople;

  private String summaryDescription;

  private Boolean hasInterview;

  @Column(columnDefinition = "TEXT")
  private String detailDescription;

  private String target;

  @Embedded AnnouncementPeriodInfoVO announcementPeriodInfoVO;

  @ElementCollection
  @OrderBy("displayOrder ASC")
  private List<TagVO> tags;

  @Enumerated(EnumType.STRING)
  private AnnouncementType announcementType;

  private String activityPeriod;

  @Enumerated(EnumType.STRING)
  private AnnouncementStatus announcementStatus;

  @OneToOne(mappedBy = "announcement", cascade = CascadeType.ALL, orphanRemoval = true)
  private ApplicationFormEntity applicationForm;

  private Boolean isDeleted;

  public void update(AnnouncementEntity announcement) {
    // announcement update
    this.title = announcement.getTitle();
    this.numberOfPeople = announcement.getNumberOfPeople();
    this.summaryDescription = announcement.getSummaryDescription();
    this.hasInterview = announcement.getHasInterview();
    this.detailDescription = announcement.getDetailDescription();
    this.target = announcement.getTarget();
    this.announcementType = announcement.getAnnouncementType();
    this.activityPeriod = announcement.getActivityPeriod();
    this.announcementStatus = announcement.getAnnouncementStatus();
    this.isDeleted = announcement.getIsDeleted();
    this.tags = announcement.getTags();
    this.announcementPeriodInfoVO = announcement.getAnnouncementPeriodInfoVO();

    // applicationForm update
    this.applicationForm.update(announcement.getApplicationForm());
  }
}
