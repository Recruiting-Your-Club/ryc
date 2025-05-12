package com.ryc.api.v2.club.infra;

// @DataJpaTest
// @Import({ClubRepositoryImpl.class, ClubMapper.class, ClubTagMapper.class})
// class ClubRepositoryImplTest {
//
//  @Autowired private ClubRepository clubRepository;
//
//  @Autowired private ClubJpaRepository clubJpaRepository;
//  @Autowired private ClubTagJpaRepository clubTagJpaRepository;
//
//  @Test
//  @DisplayName("ClubRepositoryImpl - Club 및 Tag 저장 테스트")
//  void saveClubWithTags() {
//    // given
//    Club club =
//        Club.initialize(
//            ClubCreateRequest.builder()
//                .name("테스트 동아리")
//                .shortDescription("설명")
//                .category(Category.ACADEMIC)
//                .tagNames(List.of("코딩"))
//                .build(),
//            "MOCK_URL",
//            "MOCK_URL",
//            List.of(ClubTag.initialize("코딩")));
//
//    // when
//    Club saved = clubRepository.save(club);
//
//    // then
//    assertThat(saved).isNotNull();
//    assertThat(saved.getClubTags()).hasSize(1);
//    assertThat(saved.getName()).isEqualTo("테스트 동아리");
//
//    assertThat(clubJpaRepository.findById(saved.getId())).isPresent();
//    assertThat(clubTagJpaRepository.findAll()).hasSize(1);
//  }
// }
