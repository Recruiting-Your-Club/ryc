package com.ryc.api.v2.club.infra.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import org.hibernate.annotations.SQLDelete;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "clubs")
@SQLDelete(sql = "UPDATE clubs SET is_deleted = true WHERE id = ?")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ClubEntity extends BaseEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(unique = true, nullable = false)
  private String name;

  private String shortDescription;

  @Column(columnDefinition = "TEXT")
  private String detailDescription;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Category category;

  @Builder.Default
  @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ClubTagEntity> clubTags = new ArrayList<>();

  @Builder.Default
  @OneToMany(mappedBy = "club", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<ClubSummaryEntity> clubSummaries = new ArrayList<>();

  @Builder.Default private Boolean isDeleted = Boolean.FALSE;

  public void addClubTag(ClubTagEntity clubTag) {
    clubTags.add(clubTag);
    clubTag.setClub(this);
  }

  public void addClubSummary(ClubSummaryEntity clubSummary) {
    clubSummaries.add(clubSummary);
    clubSummary.setClub(this);
  }
}
