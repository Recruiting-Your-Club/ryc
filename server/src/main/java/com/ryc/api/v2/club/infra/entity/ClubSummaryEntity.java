package com.ryc.api.v2.club.infra.entity;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Table(name = "club_summaries")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubSummaryEntity {

  @Id private String id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String content;

  @Setter
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id", nullable = false)
  private ClubEntity club;
}
