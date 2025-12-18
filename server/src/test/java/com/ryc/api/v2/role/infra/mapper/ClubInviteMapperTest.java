package com.ryc.api.v2.role.infra.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.role.domain.ClubInvite;
import com.ryc.api.v2.role.infra.entity.ClubInviteEntity;

class ClubInviteMapperTest {

  @Test
  @DisplayName("ClubInvite 도메인을 엔티티로 변환하고 다시 도메인으로 변환하면, 필드 누락 없이 원래 값과 동일해야 한다.")
  void mappingRoundTripTest() {
    // given
    LocalDateTime now = LocalDateTime.now();
    Club club = createClub("test-club");

    ClubInvite originalDomain =
        ClubInvite.builder().id(UUID.randomUUID().toString()).club(club).expiresAt(now).build();

    // when
    ClubInviteEntity entity = ClubInviteMapper.toEntity(originalDomain);
    ClubInvite resultDomain = ClubInviteMapper.toDomain(entity);

    // then
    assertThat(resultDomain).usingRecursiveComparison().isEqualTo(originalDomain);
  }

  Club createClub(String name) {
    return Club.builder()
        .id(UUID.randomUUID().toString())
        .name(name)
        .category(Category.ACADEMIC)
        .clubTags(List.of())
        .clubSummaries(List.of())
        .build();
  }
}
