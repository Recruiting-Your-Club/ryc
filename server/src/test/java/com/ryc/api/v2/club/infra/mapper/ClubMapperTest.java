package com.ryc.api.v2.club.infra.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.infra.entity.ClubEntity;

class ClubMapperTest {

  @Test
  @DisplayName("Club 도메인을 엔티티로 변환한다.")
  void toEntity_givenClubDomain_mapsToEntity() {
    // given
    Club domain =
        Club.builder()
            .id(UUID.randomUUID().toString())
            .name("test-club")
            .shortDescription("test-club")
            .detailDescription("test-club")
            .category(Category.from("PERFORMANCE_ARTS"))
            .clubTags(List.of())
            .clubSummaries(List.of())
            .build();

    // when
    ClubEntity entity = ClubMapper.toEntity(domain);

    // then
    assertThat(entity.getId()).isEqualTo(domain.getId());
    assertThat(entity.getName()).isEqualTo(domain.getName());
    assertThat(entity.getShortDescription()).isEqualTo(domain.getShortDescription());
    assertThat(entity.getDetailDescription()).isEqualTo(domain.getDetailDescription());
    assertThat(entity.getCategory()).isEqualTo(domain.getCategory());
    assertThat(entity.getClubTags()).hasSize(domain.getClubTags().size());
    assertThat(entity.getClubSummaries()).hasSize(domain.getClubSummaries().size());
  }

  @Test
  @DisplayName("Club 엔티티를 도메인으로 변환한다.")
  void toDomain_givenClubEntity_mapsToDomain() {
    // given
    ClubEntity entity =
        ClubEntity.builder()
            .id(UUID.randomUUID().toString())
            .name("test-club")
            .shortDescription("test-club")
            .detailDescription("test-club")
            .category(Category.from("PERFORMANCE_ARTS"))
            .clubTags(List.of())
            .clubSummaries(List.of())
            .build();

    // when
    Club domain = ClubMapper.toDomain(entity);

    // then
    assertThat(domain.getId()).isEqualTo(entity.getId());
    assertThat(domain.getName()).isEqualTo(entity.getName());
    assertThat(domain.getShortDescription()).isEqualTo(entity.getShortDescription());
    assertThat(domain.getDetailDescription()).isEqualTo(entity.getDetailDescription());
    assertThat(domain.getCategory()).isEqualTo(entity.getCategory());
    assertThat(domain.getClubTags()).hasSize(entity.getClubTags().size());
    assertThat(domain.getClubSummaries()).hasSize(entity.getClubSummaries().size());
  }
}
