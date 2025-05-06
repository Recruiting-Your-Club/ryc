package com.ryc.api.v2.announcement.infra.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "announcement_tags")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)

public class AnnouncementTagEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "announcement_id")
    private AnnouncementEntity announcementEntity;
}
