package com.ryc.api.v2.club.infra.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "club_detail_images")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubDetailImageEntity {

  @Id private String id;

  @Column(nullable = false, length = 500)
  private String imageUrl;

  @Column(nullable = false, length = 500)
  private String thumbnailUrl;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id", nullable = false)
  private ClubEntity club;
}
