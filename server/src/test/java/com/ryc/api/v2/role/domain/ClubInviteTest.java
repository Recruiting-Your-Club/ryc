package com.ryc.api.v2.role.domain;

import static com.ryc.api.v2.common.constant.DomainDefaultValues.DEFAULT_INITIAL_ID;
import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.enums.Category;

class ClubInviteTest {

  @Test
  @DisplayName("ClubInvite를 초기화한다.")
  void initialize() {
    // given & when
    Club club = createClub("Test Club");
    ClubInvite clubInvite = ClubInvite.initialize(club);

    // then
    assertThat(clubInvite.getId()).isEqualTo(DEFAULT_INITIAL_ID);
    assertThat(clubInvite.getClub()).isEqualTo(club);
    assertThat(clubInvite.getExpiresAt()).isAfter(LocalDateTime.now().plusDays(1));
  }

  @Test
  @DisplayName("ClubInvite가 만료되었는지 확인한다.")
  void isExpired() {
    // given
    Club club = createClub("Test Club");
    ClubInvite expiredInvite =
        ClubInvite.builder().club(club).expiresAt(LocalDateTime.now().minusDays(1)).build();
    ClubInvite validInvite =
        ClubInvite.builder().club(club).expiresAt(LocalDateTime.now().plusDays(1)).build();

    // when & then
    assertThat(expiredInvite.isExpired()).isTrue();
    assertThat(validInvite.isExpired()).isFalse();
  }

  Club createClub(String name) {
    return Club.builder()
        .id(UUID.randomUUID().toString())
        .name(name)
        .category(Category.ACADEMIC)
        .clubTags(new ArrayList<>())
        .clubSummaries(new ArrayList<>())
        .build();
  }
}
