package com.ryc.api.v2.announcement.infra.entity;

import java.util.List;

import jakarta.persistence.*;

import org.hibernate.annotations.SQLDelete;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementType;
import com.ryc.api.v2.announcement.infra.vo.AnnouncementPeriodInfoVO;
import com.ryc.api.v2.announcement.infra.vo.TagVO;
import com.ryc.api.v2.applicationForm.infra.entity.ApplicationFormEntity;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

@Entity
@Table(name = "announcements")
@SQLDelete(sql = "UPDATE announcements SET is_deleted = true WHERE id = ?")
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

  private String field;

  @Embedded AnnouncementPeriodInfoVO announcementPeriodInfoVO;

  @ElementCollection
  @CollectionTable(name = "announcement_tags", joinColumns = @JoinColumn(name = "announcement_id"))
  @OrderBy("displayOrder ASC")
  private List<TagVO> tags;

  @Enumerated(EnumType.STRING)
  private AnnouncementType announcementType;

  private String activityPeriod;

  @OneToOne(mappedBy = "announcement", cascade = CascadeType.ALL, orphanRemoval = true)
  private ApplicationFormEntity applicationForm;

  @Builder.Default private Boolean isDeleted = Boolean.FALSE;

  public void update(AnnouncementEntity announcement) {
    // announcement update
    this.title = announcement.getTitle();
    this.numberOfPeople = announcement.getNumberOfPeople();
    this.summaryDescription = announcement.getSummaryDescription();
    this.hasInterview = announcement.getHasInterview();
    this.detailDescription = announcement.getDetailDescription();
    this.target = announcement.getTarget();
    this.field = announcement.getField();
    this.announcementType = announcement.getAnnouncementType();
    this.activityPeriod = announcement.getActivityPeriod();
    this.isDeleted = announcement.getIsDeleted();
    this.tags = announcement.getTags();
    this.announcementPeriodInfoVO = announcement.getAnnouncementPeriodInfoVO();

    // applicationForm update
    this.applicationForm.update(announcement.getApplicationForm());
  }
}
