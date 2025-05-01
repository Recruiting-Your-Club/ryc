package com.ryc.api.v2.club.infra.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.common.entity.BaseEntity;

import lombok.*;

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

  @OneToMany(
      mappedBy = "clubEntity",
      fetch = FetchType.LAZY,
      cascade = CascadeType.ALL,
      orphanRemoval = true)
  private List<ClubTagEntity> clubTags = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  private Category category;

  private Boolean deleted;
}
