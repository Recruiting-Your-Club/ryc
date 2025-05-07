package com.ryc.api.v2.announcement.infra.entity;

import com.ryc.api.v2.club.infra.entity.ClubEntity;
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
    private AnnouncementPeriod announcementPeriod;

    @ElementCollection
    @CollectionTable(name = "announcement_images")
    private List<String> images;

    @ElementCollection
    @CollectionTable(name = "announcement_tags")
    private List<String> tags;

    private String activityPeriod;

    private Boolean isDeleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private ClubEntity club;
}
