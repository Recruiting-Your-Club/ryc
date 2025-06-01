package com.ryc.api.v2.club.infra.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.ClubDetailImage;
import com.ryc.api.v2.club.domain.ClubSummary;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clubs")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubEntity extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(unique = true)
  private String name;

  private String shortDescription;

  @Column(columnDefinition = "TEXT")
  private String detailDescription;

  private String imageUrl;
  private String thumbnailUrl;

  @Enumerated(EnumType.STRING)
  private Category category;

  @Builder.Default
  @ElementCollection
  @CollectionTable(name = "club_tags", joinColumns = @JoinColumn(name = "club_id"))
  private List<ClubTag> clubTags = new ArrayList<>();

  @Builder.Default
  @ElementCollection
  @CollectionTable(name = "club_summaries", joinColumns = @JoinColumn(name = "club_id"))
  private List<ClubSummary> clubSummaries = new ArrayList<>();

  @Builder.Default
  @ElementCollection
  @CollectionTable(name = "club_detail_images", joinColumns = @JoinColumn(name = "club_id"))
  private List<ClubDetailImage> clubDetailImages = new ArrayList<>();

  @Builder.Default private Boolean deleted = Boolean.FALSE;
}
