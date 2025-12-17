package com.ryc.api.v2.club.infra.jpa;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.enums.Category;
import com.ryc.api.v2.club.infra.entity.ClubEntity;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class ClubJpaRepositoryTest {

  @Autowired ClubJpaRepository clubJpaRepository;

  @Test
  @DisplayName("Club을 name으로 조회한다.")
  void existsByName_givenExistingName_returnsTrue() {
    // given
    String clubName = "test-club";
    ClubEntity club = ClubEntity.builder().name(clubName).category(Category.ACADEMIC).build();

    // when
    clubJpaRepository.save(club);
    boolean exists = clubJpaRepository.existsByName(clubName);

    // then
    assertTrue(exists);
  }

  @Test
  @DisplayName("Club을 존재하지 않는 name으로 조회 시 false 반환")
  void existsByName_givenNonExistentName_returnsFalse() {
    // when
    boolean nonExists = clubJpaRepository.existsByName("non-existent-club");

    // then
    assertFalse(nonExists);
  }

  @Test
  @DisplayName("Club을 id로 조회한다.")
  void existsById_givenExistingId_returnsTrue() {
    // given
    ClubEntity club = ClubEntity.builder().name("test-club").category(Category.ACADEMIC).build();

    // when
    ClubEntity saved = clubJpaRepository.save(club);
    boolean exists = clubJpaRepository.existsById(saved.getId());

    // then
    assertTrue(exists);
  }

  @Test
  @DisplayName("Club을 존재하지 않는 id로 조회 시 false 반환")
  void existsById_givenNonExistentId_returnsFalse() {
    // when
    boolean nonExists = clubJpaRepository.existsById("non-existent-club");

    // then
    assertFalse(nonExists);
  }

  @Test
  @DisplayName("Soft-delete된 Club에 대해 existsById를 호출하면 false를 반환한다.")
  void existsById_givenSoftDeletedId_returnsFalse() {
    // given
    ClubEntity club = ClubEntity.builder().name("test-club").category(Category.ACADEMIC).build();
    ClubEntity saved = clubJpaRepository.save(club);

    // when
    // @SQLDelete 어노테이션에 의해 is_deleted = true로 업데이트 됩니다.
    clubJpaRepository.deleteById(saved.getId());

    // existsById는 is_deleted = false인 것만 확인하므로 false를 반환해야 합니다.
    boolean exists = clubJpaRepository.existsById(saved.getId());

    // then
    assertFalse(exists);
  }
}
