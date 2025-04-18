package com.ryc.api.v2.club.infra;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubRepository;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;
import com.ryc.api.v2.club.infra.jpa.ClubTagJpaRepository;
import com.ryc.api.v2.club.infra.mapper.ClubMapper;
import com.ryc.api.v2.club.infra.mapper.ClubTagMapper;
import com.ryc.api.v2.club.presentation.dto.request.ClubCreateRequest;

@DataJpaTest
@Import({ClubRepositoryImpl.class, ClubMapper.class, ClubTagMapper.class})
class ClubRepositoryImplTest {

  @Autowired private ClubRepository clubRepository;

  @Autowired private ClubJpaRepository clubJpaRepository;
  @Autowired private ClubTagJpaRepository clubTagJpaRepository;

  @Test
  @DisplayName("ClubRepositoryImpl - Club 및 Tag 저장 테스트")
  void saveClubWithTags() {
    // given
    Club club =
        Club.initialize(
            ClubCreateRequest.builder()
                .name("테스트 동아리")
                .description("설명")
                .category(Category.ACADEMIC)
                .tagNames(List.of("코딩"))
                .build(),
            "MOCK_URL",
            "MOCK_URL",
            List.of(ClubTag.initialize("코딩")));

    // when
    Club saved = clubRepository.save(club);

    // then
    assertThat(saved).isNotNull();
    assertThat(saved.getClubTags()).hasSize(1);
    assertThat(saved.getName()).isEqualTo("테스트 동아리");

    assertThat(clubJpaRepository.findById(saved.getId())).isPresent();
    assertThat(clubTagJpaRepository.findAll()).hasSize(1);
  }
}
