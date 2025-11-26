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
  void existsByName() {
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
  void existsByName_false() {
    // when
    boolean nonExists = clubJpaRepository.existsByName("non-existent-club");

    // then
    assertFalse(nonExists);
  }

  @Test
  @DisplayName("Club을 id로 조회한다.")
  void existsById() {
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
  void existsById_false() {
    // when
    boolean nonExists = clubJpaRepository.existsById("non-existent-club");

    // then
    assertFalse(nonExists);
  }
}
