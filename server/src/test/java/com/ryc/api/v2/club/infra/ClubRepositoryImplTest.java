package com.ryc.api.v2.club.infra;

import static org.assertj.core.api.Assertions.*;

import java.util.List;
import java.util.NoSuchElementException;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.club.domain.Club;

@SpringBootTest
@Transactional
@ActiveProfiles("test")
class ClubRepositoryImplTest {

  @Autowired ClubRepositoryImpl clubRepository;

  @Test
  @DisplayName("Club을 저장한다.")
  void save() {
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
  void findById_success() {
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
  void findById_notFound() {
    // given
    String nonExistId = "non-existent-id";

    // then
    assertThatThrownBy(() -> clubRepository.findById(nonExistId))
        .isInstanceOf(NoSuchElementException.class);
  }

  @Test
  @DisplayName("여러 Club을 저장한 뒤 findAll로 모두 조회한다.")
  void findAll_success() {
    // given
    Club c1 = Club.initialize("club-1", "PERFORMANCE_ARTS");
    Club c2 = Club.initialize("club-2", "SPORTS");
    Club c3 = Club.initialize("club-3", "HOBBY");

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
}
