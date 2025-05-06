package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

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

    private LocalDateTime announcementStartDate;
    private LocalDateTime announcementEndDate;

    private LocalDateTime applicationStartDate;
    private LocalDateTime applicationEndDate;

    private LocalDateTime interviewStartDate;
    private LocalDateTime interviewEndDate;

    private LocalDateTime resultAnnouncementDate;

    private String activityPeriod;

    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private ClubEntity club;
}
