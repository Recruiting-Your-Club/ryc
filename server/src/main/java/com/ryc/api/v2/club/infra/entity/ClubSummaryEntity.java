package com.ryc.api.v2.club.infra.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "club_summaries")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubSummaryEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  private String title;

  private String value;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private ClubEntity clubEntity;
}
