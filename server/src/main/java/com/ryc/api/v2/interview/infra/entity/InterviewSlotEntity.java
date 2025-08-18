package com.ryc.api.v2.interview.infra.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.announcement.infra.vo.PeriodVO;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interview_slots")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
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

  @Embedded private PeriodVO period;

  @Builder.Default
  @OneToMany(mappedBy = "interviewSlot", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<InterviewReservationEntity> interviewReservations = new ArrayList<>();

  public void addReservation(InterviewReservationEntity reservation) {
    reservation.setInterviewSlot(this);
    interviewReservations.add(reservation);
  }
}
