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
  @DisplayName("Club 도메인을 엔티티로 변환하고 다시 도메인으로 변환하면, 필드 누락 없이 원래 값과 동일해야 한다.")
  void mappingRoundTripTest() {
    // given
    Club originalDomain =
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
    ClubEntity entity = ClubMapper.toEntity(originalDomain);
    Club resultDomain = ClubMapper.toDomain(entity);

    // then
    assertThat(resultDomain).usingRecursiveComparison().isEqualTo(originalDomain);
  }
}
