package com.ryc.api.v2.club.infra;

import static org.assertj.core.api.Assertions.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ryc.api.v2.club.domain.Category;
import com.ryc.api.v2.club.domain.Club;
import com.ryc.api.v2.club.domain.ClubTag;
import com.ryc.api.v2.club.infra.entity.ClubEntity;
import com.ryc.api.v2.club.infra.jpa.ClubJpaRepository;

@ExtendWith(MockitoExtension.class)
class ClubRepositoryImplTest {

  @Mock private ClubJpaRepository clubJpaRepository;

  @InjectMocks private ClubRepositoryImpl clubRepository;

  private Club testClub;
  private ClubEntity testClubEntity;

  @BeforeEach
  void setUp() {
    List<ClubTag> testTags =
        List.of(ClubTag.builder().name("Tag1").build(), ClubTag.builder().name("Tag2").build());

    testClub =
        Club.builder()
            .id("test-id")
            .name("Test Club")
            .shortDescription("Short description")
            .detailDescription("Detailed description")
            .imageUrl("http://example.com/image.jpg")
            .thumbnailUrl("http://example.com/thumbnail.jpg")
            .category(Category.ACADEMIC)
            .clubTags(testTags)
            .clubSummaries(new ArrayList<>())
            .clubDetailImages(new ArrayList<>())
            .build();

    // Create a ClubEntity using the builder pattern
    testClubEntity =
        ClubEntity.builder()
            .id("test-id")
            .name("Test Club")
            .shortDescription("Short description")
            .detailDescription("Detailed description")
            .imageUrl("http://example.com/image.jpg")
            .thumbnailUrl("http://example.com/thumbnail.jpg")
            .category(Category.ACADEMIC)
            .clubTags(testTags)
            .clubSummaries(new ArrayList<>())
            .clubDetailImages(new ArrayList<>())
            .deleted(false)
            .build();
  }

  @Test
  @DisplayName("클럽 저장 테스트")
  void givenValidClub_whenSave_thenReturnSavedClub() {
    // Given
    when(clubJpaRepository.save(any(ClubEntity.class))).thenReturn(testClubEntity);

    // When
    Club savedClub = clubRepository.save(testClub);

    // Then
    assertThat(savedClub).isNotNull();
    assertThat(savedClub.getId()).isEqualTo(testClubEntity.getId());
    assertThat(savedClub.getName()).isEqualTo(testClubEntity.getName());
    assertThat(savedClub.getShortDescription()).isEqualTo(testClubEntity.getShortDescription());
    assertThat(savedClub.getDetailDescription()).isEqualTo(testClubEntity.getDetailDescription());
    assertThat(savedClub.getImageUrl()).isEqualTo(testClubEntity.getImageUrl());
    assertThat(savedClub.getThumbnailUrl()).isEqualTo(testClubEntity.getThumbnailUrl());
    assertThat(savedClub.getCategory()).isEqualTo(testClubEntity.getCategory());
    assertThat(savedClub.getClubTags()).isEqualTo(testClubEntity.getClubTags());
    assertThat(savedClub.getClubSummaries()).isEqualTo(testClubEntity.getClubSummaries());
    assertThat(savedClub.getClubDetailImages()).isEqualTo(testClubEntity.getClubDetailImages());
    verify(clubJpaRepository, times(1)).save(any(ClubEntity.class));
  }

  @Test
  @DisplayName("ID로 클럽 조회 테스트")
  void givenValidClubId_whenFindById_thenReturnClub() {
    // Given
    String clubId = "test-id";
    when(clubJpaRepository.findById(clubId)).thenReturn(Optional.of(testClubEntity));

    // When
    Optional<Club> foundClub = clubRepository.findById(clubId);

    // Then
    assertThat(foundClub).isNotEmpty();
    assertThat(foundClub.get().getId()).isEqualTo(testClubEntity.getId());
    assertThat(foundClub.get().getName()).isEqualTo(testClubEntity.getName());
    assertThat(foundClub.get().getShortDescription())
        .isEqualTo(testClubEntity.getShortDescription());
    assertThat(foundClub.get().getDetailDescription())
        .isEqualTo(testClubEntity.getDetailDescription());
    assertThat(foundClub.get().getImageUrl()).isEqualTo(testClubEntity.getImageUrl());
    assertThat(foundClub.get().getThumbnailUrl()).isEqualTo(testClubEntity.getThumbnailUrl());
    assertThat(foundClub.get().getCategory()).isEqualTo(testClubEntity.getCategory());
    assertThat(foundClub.get().getClubTags()).isEqualTo(testClubEntity.getClubTags());
    assertThat(foundClub.get().getClubSummaries()).isEqualTo(testClubEntity.getClubSummaries());
    assertThat(foundClub.get().getClubDetailImages())
        .isEqualTo(testClubEntity.getClubDetailImages());
    verify(clubJpaRepository, times(1)).findById(clubId);
  }

  @Test
  @DisplayName("모든 클럽 조회 테스트")
  void givenExistingClubs_whenFindAllClub_thenReturnAllClub() {
    // Given
    List<ClubEntity> clubEntities = List.of(testClubEntity);
    when(clubJpaRepository.findAll()).thenReturn(clubEntities);

    // When
    List<Club> clubs = clubRepository.findAll();

    // Then
    assertThat(clubs).isNotNull();
    assertThat(clubs).isNotEmpty();
    assertThat(clubs).hasSize(1);
    verify(clubJpaRepository, times(1)).findAll();
  }
}
