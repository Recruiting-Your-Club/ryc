package com.ryc.api.v2.announcement.infra.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "announcement_images")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AnnouncementImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String url;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "announcement_id")
    private AnnouncementEntity announcementEntity;
}
