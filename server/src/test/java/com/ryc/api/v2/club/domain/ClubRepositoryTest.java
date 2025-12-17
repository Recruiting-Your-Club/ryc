package com.ryc.api.v2.club.domain;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.NoSuchElementException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class ClubRepositoryTest {

  @Autowired ClubRepository clubRepository;

  @Test
  @DisplayName("Club을 저장한다.")
  void save_givenNewClub_savesAndReturnsClub() {
    // given
    String clubName = "test-club";
    String clubCategory = "PERFORMANCE_ARTS";
    Club club = Club.initialize(clubName, clubCategory);

    // when
    Club savedClub = clubRepository.save(club);

    // then
    assertThat(savedClub.getId()).isNotNull();
    assertThat(savedClub.getName()).isEqualTo(clubName);
    assertThat(savedClub.getCategory().toString()).isEqualTo(clubCategory);
  }

  @Test
  @DisplayName("Club을 id로 조회한다.")
  void findById_givenExistingId_returnsClub() {
    // given
    String clubName = "find-club";
    String clubCategory = "PERFORMANCE_ARTS";
    Club club = Club.initialize(clubName, clubCategory);

    // when
    Club saved = clubRepository.save(club);
    Club found = clubRepository.findById(saved.getId());

    // then
    assertThat(found.getId()).isNotNull();
    assertThat(found.getId()).isEqualTo(saved.getId());
    assertThat(found.getName()).isEqualTo(clubName);
    assertThat(found.getCategory().toString()).isEqualTo(clubCategory);
  }

  @Test
  @DisplayName("Club을 존재하지 않는 id로 조회시 NoSuchElementException 발생")
  void findById_givenNonExistentId_throwsNoSuchElementException() {
    // given
    String nonExistId = "non-existent-id";

    // when // then
    assertThatThrownBy(() -> clubRepository.findById(nonExistId))
        .isInstanceOf(NoSuchElementException.class);
  }

  @Test
  @DisplayName("여러 Club을 저장한 뒤 findAll로 모두 조회한다.")
  void findAll_whenClubsExist_returnsAllClubs() {
    // given
    Club c1 = Club.initialize("club-1", "PERFORMANCE_ARTS");
    Club c2 = Club.initialize("club-2", "SPORTS");
    Club c3 = Club.initialize("club-3", "ACADEMIC");

    // when
    clubRepository.save(c1);
    clubRepository.save(c2);
    clubRepository.save(c3);

    List<Club> clubs = clubRepository.findAll();
    List<String> names = clubs.stream().map(Club::getName).toList();

    // then
    assertThat(clubs).hasSize(3);
    assertThat(names).contains("club-1", "club-2", "club-3");
  }

  @Test
  @DisplayName("Club을 soft-delete한 후 findById로 조회하면 NoSuchElementException이 발생한다.")
  void findById_givenSoftDeletedId_throwsException() {
    // given
    Club club = Club.initialize("test-club", "ACADEMIC");
    Club savedClub = clubRepository.save(club);

    // when
    clubRepository.deleteById(savedClub.getId());

    // then
    assertThatThrownBy(() -> clubRepository.findById(savedClub.getId()))
        .isInstanceOf(NoSuchElementException.class);
  }

  @Test
  @DisplayName("Club을 soft-delete한 후 findAll로 조회하면 삭제된 Club은 포함되지 않는다.")
  void findAll_afterSoftDelete_excludesDeletedClub() {
    // given
    Club club1 = Club.initialize("club-1", "PERFORMANCE_ARTS");
    Club club2 = Club.initialize("club-2", "SPORTS");
    Club savedClub1 = clubRepository.save(club1);
    clubRepository.save(club2);

    // when
    clubRepository.deleteById(savedClub1.getId());
    List<Club> clubs = clubRepository.findAll();

    // then
    assertThat(clubs).hasSize(1);
    assertThat(clubs.get(0).getName()).isEqualTo("club-2");
  }
}
