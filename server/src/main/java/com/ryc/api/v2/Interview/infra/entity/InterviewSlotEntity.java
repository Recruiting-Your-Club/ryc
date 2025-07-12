package com.ryc.api.v2.Interview.infra.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.ryc.api.v2.announcement.infra.vo.PeriodVO;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interview_slots")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterviewSlotEntity extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false)
  private String creatorId;

  @Column(nullable = false)
  private String announcementId;

  @Column(nullable = false)
  private Integer maxNumberOfPeople;

  @Column(nullable = false)
  private PeriodVO period;

  @Builder
  public InterviewSlotEntity(
      String id,
      String creatorId,
      String announcementId,
      Integer maxNumberOfPeople,
      PeriodVO period,
      LocalDateTime createdAt,
      LocalDateTime updatedAt) {
    super(createdAt, updatedAt);
    this.id = id;
    this.creatorId = creatorId;
    this.announcementId = announcementId;
    this.maxNumberOfPeople = maxNumberOfPeople;
    this.period = period;
  }
}
